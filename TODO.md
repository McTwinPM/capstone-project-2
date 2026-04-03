# TODO List


1. Set up server
    1. install python dependencies(done)
    2. create server folder/files(done)
    3. code files
        1. app (done)
        2. models (done)
        3. config (done)
        4. seed (done)
    4. migrate database (done)
2. Set up Client
    1. install React/Javascript dependencies (done)
    2. set up components
        1. Navbar (done)
        2. AddRecipeForm (done)
        3. EditRecipeButton (done)
        4. DeleteRecipeButton (done)
        5. SearchBar (done)
        6. Loginform (done)
        7. SignUpForm (done)
    3. Set up pages
        1. Home/Login (done)
        2. Recipes (done)
        3. RecipeID (done)
        4. AddRecipe (done)
    4. CSS
        1. App (done)
        2. Login (done)
        3. RecipeList (done)
        4. AddRecipe page (done)
        5. Navbar (done)
3. Cleanup
    1. frontend
        1. remove 'assets' and 'public' folders (done)
        2. remove comments of old code/unneeded comments
    2. backend
        1. remove comments of old code/unneeded comments
4. README

# Notes from Pitch

Alcoholic Cocktail Recipe cookbook

## Step 1: Business Problem Scenario 
Too often people in the modern era resort to alcoholic drink recipes online from ad-invested sites or unsorted notes on our phones or PCs. Not to mention having to go through useless age-verifications from those websites. Back in the old days, our parents made cookbooks where they could store their recipes. I wanted to apply this return to simplicity, with a modern approach of a web application.

This app will allow users to make an account, and with that account, be able to create and store their own alcoholic cocktail recipes. Alternatively, they can also edit and refine drink recipes already created and delete recipes that they do not want anymore.
	

## Step 2: Problem-Solving Process
1.	Backend/database modules needed (python)
    1.	Flask
    2.	SQLAlchemy
2.	2 Databases – Users, recipes, 
    1.	User models will need 
        1.	usernames (string)
        2.	 passwords (hash), 
            1.	Routes will also need to allow for authorization
        3.	date of birth (Date)
            1.	need Datetime module
            2.	need to show they are at least 21(validations, error handling)
        4.	Users can store as many recipes as possible 
            1.	One-to-many relationship
            2.	Pagination for recipes
    2.	Recipe models will need:
        1. columns
            1.	 Title (string)
            2.	 ingredients/tools, (objects)
            3.	Directions (string)
        2.	Recipes will be displayed after the user has signed in
        3.	Users can add, delete, and update older recipes (full crud)
3.	Frontend modules needed (Javascript +Vite)
    1.	React
    2.	React router
    3.	useState/UseEffect
    4.	Navlink
4.	Pages needed
    1.	Home
        1.	Login for auth
    2.	Recipes
        1.	RecipeList
    3.	Recipe
        1.	Components for “add”, “delete”, and “edit” buttons displayed here
    4.	Add recipe
5.	Components needed
    1.	AddReceipeForm
    2.	deleteRecipeButton
    3.	EditRecipeButton
    4.	Navigation bar – will have Logout, Recipes, and Add Recipes
    5.	SearchBar – filter recipes

## Step 3: Timeline and Scope
1.	Backend “Server” (Python, Flask, SQLAlchemy) 
    1.	Dependencies - >1 day
    2.	Seed – 1-2 days
    3.	Models – 1-2 days
    4.	Config - >1 day
    5.	App – 1 day
    6.	Databases/Data migration - >1 day
2.	Frontend “client” (JavaScript + Vite, React, React Router) 
    1.	Dependences/installing Vite - > 1 day
    2.	Components
        1.	Navbar - >1 day
        2.	SearchBar - >1day
        3.	AddRecipeForm – >1 day
        4.	Authorization – 1 day
    3.	Pages
        1.	Home/Login – 2 days
        2.	RecipesList – 1 days
        3.	Recipe - >1 day
        4.	AddRecipeForm/AddRecipePage?– >1 day
    4.	App(useState/UseEffect) – 2 days
    5.	CSS – 2 days
3.	Debugging/Error handling – 1 day
4.	README – 1 day
