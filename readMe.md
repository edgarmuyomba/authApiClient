# JWT Authentication Web Client

This project is a web client that consumes the JWT Authentication API implemented using Django Rest Framework. It allows users to interact with the API for authentication, token management, and secure communication.

## Features

- User-friendly interface for registration, login, and token management.
- Automatic token validation and refreshing.
- Prompt for re-login when both tokens are expired.
- Interacts with the JWT Authentication API endpoints.

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/your-authentication-web-client.git
   cd your-authentication-web-client

2. **Serving the client**
    Inside a terminal, run the command
    ```bash
    python -m http.server 8001
    ```
    it is specific to 8001 because this address is accepted in the AuthenticationAPI's `CORS_ALLOWED_ORIGINS`. this can be modified to your desire.
    Open the client.html file in a browser on port *8001*

## Usage
- Once the page loads, the client will attempt to fetch the *access* token from localStorage. If its not there, you will be prompted to login.
- Once its retrieved from the server, you will be forwarded to the authenticated page where you will be shown a message from the server. this can as well be customized to your desire.
- Token verification and refresh are automatically handled by the client and when both tokens are expired, you will be prompted to login again.

## Security Considerations
**Storage**: Tokens are stored in the browser's local storage for this demo. In a production environment, consider using more secure methods such as HttpOnly cookies for storing tokens