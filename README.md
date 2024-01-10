# Capstone4450

## Project Setup and Installation Guide

Follow the steps below to set up and run the project:

## Prerequisites

1. Make sure Node.js and npm are installed. Check by running:
    ```bash
    node -v
    ```

2. Ensure MongoDB is installed. Refer to `textfiles/mongodb_setup.txt` for installation instructions.

3. Verify MongoDB is running by checking MongoDB Compass or mongosh. Use the following command to see available databases:
    ```bash
    show dbs
    ```

## Project Setup

4. Open a terminal and navigate to the `server` directory. Run the following command to install server dependencies:
    ```bash
    cd server
    npm install
    ```

5. Open another terminal and navigate to the `web-app` directory. Run the following command to install web application dependencies:
    ```bash
    cd web-app
    npm install
    ```

6. Ensure the Angular CLI is installed. Check by running:
    ```bash
    ng -v
    ```

## Running the Application

7. In the first terminal, start the Node.js server by running:
    ```bash
    node server.js
    ```

8. In the second terminal, start the Angular application with:
    ```bash
    ng serve
    ```

9. Open a web browser and navigate to `http://localhost:4200`. The application should be accessible.

## User Registration

10. Sign up using your email and password on the provided form.

11. Click the "Sign Up" button to complete the registration.

You are now ready to use the application! Ensure MongoDB is up and running to avoid any issues.

