const home = document.querySelector('.home');
const login = document.querySelector('.form-container');

window.onload = async () => {

    const access = localStorage.getItem('access');

    if (!access) {
        displayLogin();
    } else {
        if (await verifyToken()) getIndex();
        else {
            if (await refreshToken()) {
                getIndex();
                setState();
            }
            else {
                localStorage.clear();
                setFailed();
                displayLogin();
            }
        }
    }
}

const loginForm = document.getElementById("loginForm");
const endpoint = 'http://localhost:8000'

loginForm.addEventListener('submit', handleLogin);

function handleLogin(event) {
    event.preventDefault();
    let formData = new FormData(loginForm);

    let formObject = Object.fromEntries(formData);

    const loginUrl = `${endpoint}/accounts/token/`

    options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formObject)
    };

    fetch(loginUrl, options)
        .then(response => response.json())
        .then(authData => handleAuth(authData, getIndex))
        .catch(err => console.error('err', err));
}

function handleAuth(authData, callback) {
    /*
    function to store the JWTs
     */
    localStorage.setItem('access', authData.access);
    localStorage.setItem('refresh', authData.refresh);
    if (callback) {
        callback();
    }
}

function getIndex() {
    /*
    function to retrive and display the message from the server
     */
    options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    };
    fetch(endpoint, options)
        .then(response => response.json())
        .then(data => displayIndex(data))
        .catch(err => console.error('err', err));
}

async function verifyToken() {
    /*
    function to verify the validity of the token
     */
    const verifyUrl = `${endpoint}/accounts/token/verify/`;
    const token = localStorage.getItem('access');

    options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            "token": token
        })
    }

    try {
        let response = await fetch(verifyUrl, options);
        return response.status === 200;
    } catch (e) {
        console.error('Error', e);
    }
}

async function refreshToken() {
    /*
    function to refresh the access token
     */
    const refreshUrl = `${endpoint}/accounts/token/refresh/`;
    const refresh = localStorage.getItem('refresh');

    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            'refresh': refresh
        })
    };

    try {
        const response = await fetch(refreshUrl, options);
        if (response.status === 200) {
            let data = await response.json()
            localStorage.setItem('access', data.access);
            return true;
        }
    } catch (e) {
        return false
    }
}

// handling layout
function displayIndex(data) {
    const welcome = document.querySelector('h3');
    welcome.textContent = data.Success;

    home.style.display = '';
    login.style.display = 'none';
}

function displayLogin() {
    home.setAttribute('style', 'display:none');
    login.style.display = '';
}

function setState() {
    const state = document.querySelector('.state');
    state.style.display = '';
    setTimeout(() => state.style.display = 'none', "3000");
}

function setFailed() {
    const failed = document.querySelector('.failed');
    failed.style.display = '';
    setTimeout(() => failed.style.display = 'none', "3000");
}
