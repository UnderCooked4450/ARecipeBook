# ARecipe App

ARecipe is a web application built with Angular for the frontend and Node.js for the backend. This app allows users to get and save recipes to cook from leftovers in their home!

## Installation

1. Clone the repository:

git clone <repository-url>

2. Navigate to the `web-app` directory:

cd web-app

3. Install Angular CLI and project dependencies:

npm install -g @angular/cli
npm install


4. Navigate to the `server` directory:

cd ../server

6. Install dotenv:

npm install dotenv

7. Create an `.env` file in the server directory with the following contents:


PORT=3000

MONGODB_URI = mongodb+srv://admin:arecipe2024@arecipe.o6zx8ms.mongodb.net/?retryWrites=true&w=majority

## Usage

1. Start the server:

node server.js

2. In another terminal, navigate to the `web-app` directory:

cd ../web-app

3. Start the Angular development server:

ng serve

4. Open your browser and visit `http://localhost:4200` to access the application.
