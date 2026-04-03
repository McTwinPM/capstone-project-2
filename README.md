# Sláinte
Welcome to Slainte, an alcohol cocktail recipe app

This app allows users to create an account with a username and password. Once logged in, the user can create and store any number of cocktail recipes, as well as the ability to edit and delete them.


## Technology used
1. Backend
    1. Python 3.12
    2. Flask - web framework
    3. Flask-RESTful - REST API Structure
    4. Flask-Migrate - database migrations
    5. Flask-Bcrypt - password hashing
    6. Flask-CORS - cross-origin requests
    7. Marshmellow - schema validation/serialization
    8. Faker - seed data generation
    9. SQLAlchemy - ORM/database
        1. SQLite - database

2. Frontend
    1. React 19 with React DOM
    2. React Router DOM v7 - client-side routing
    3. Vite - build app and server
    4. ESLint - linting


## Setup

Fork and clone this repository

### Install Dependencies
1. Enter the command `pipenv install` to install the dependencies for the backend API.
2. Navigate to the `drink-recipe-client` folder and enter `npm install` to install necessary dependencies for the frontend client.

### Create Database
1. Navigate to the `server` folder and run `flask db init` to initialize database migration and create the folders for migration data
2. Enter `flask db migrate -m "initial migration"` for first migration
3. Then, enter `flask db upgrade head` to form the database
4. Finally, enter `python seed.py` to run the Seed file and fill your database with random data

### Run The App
1. From the `server` folder, enter `python app.py` to run the backend api.
2. In another terminal, navigate to the `drink-recipe-client` folder and enter `npm run dev` to start the frontend client


## Routes/Endpoints

1. POST Login (`/login`) - Allows login with username with password

2. POST Signup (`/signup`) - Allows user to create a new username, password, and date of birth (checks if user is 21)

3. GET Me (`/me`) - Checks for token, then retrieves current user

4. GET and POST Drink Recipes (`/drink-recipes`) - Displays cocktail recipes attributed to current user, and allows user to create new recipes with a title, ingredients, and instructions.

5. PATCH and DELETE Drink Recipe Card (`/drink_recipes/${id}`) - allows current user to edit drink recipes, and/or delete drink recipes.


## Future Features
 1. UI Redesign - Currently the app looks very bare and uninspiring. I will look to make it more visually appealling

 2. Delete button from Drink Recipe List - A delete button would allow the user to delete a recipe without having to view the whole recipe.

 3. Ingredient database - I plan on making ingredients into their own database, with "amounts" and "title" as columns/attributes

 4. ??