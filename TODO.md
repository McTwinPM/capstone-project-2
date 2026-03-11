# TODO List


1. Set up server
    1. install python dependencies
    2. create server folder/files
    3. migrate database
2. Set up Client
    1. install React/Javascript dependencies
    2. set up components
    3. Set up pages
3. Cleanup
4. README

# Notes from Pitch

Alcoholic Cocktail Recipe cookbook

## Step 1: Business Problem Scenario 
Too often people in the modern era resort to alcoholic drink recipes online from ad-invested sites or unsorted notes on our phones or PCs. Not to mention having to go through useless age-verifications from those websites. Back in the old days, our parents made cookbooks where they could store their recipes. I wanted to apply this return to simplicity, with a modern approach of a web application.

This app will allow users to make an account, and with that account, be able to create and store their own alcoholic cocktail recipes. Alternatively, they can also edit and refine drink recipes already created and delete recipes that they do not want anymore.
	

## Step 2: Problem-Solving Process
1.	Backend/database modules needed (python)
    a.	Flask
    b.	SQLAlchemy
2.	2 Databases – Users, recipes, 
    a.	User models will need 
        i.	usernames (string)
        ii.	 passwords (hash), 
            1.	Routes will also need to allow for authorization
        iii.	date of birth (Date)
            1.	need Datetime module
            2.	need to show they are at least 21(validations, error handling)
        iv.	Users can store as many recipes as possible 
            1.	One-to-many relationship
            2.	Pagination for recipes
    b.	Recipe models will need:
        i. columns
            1.	 Title (string)
            2.	 ingredients/tools, (objects)
            3.	Directions (string)
        ii.	Recipes will be displayed after the user has signed in
        iii.	Users can add, delete, and update older recipes (full crud)
3.	Frontend modules needed (Javascript +Vite)
    a.	React
    b.	React router
    c.	useState/UseEffect
    d.	Navlink
4.	Pages needed
    a.	Home
        i.	Login for auth
    b.	Recipes
        i.	RecipeList
    c.	Recipe
        i.	Components for “add”, “delete”, and “edit” buttons displayed here
    d.	Add recipe
5.	Components needed
    a.	AddReceipeForm
    b.	deleteRecipeButton
    c.	EditRecipeButton
    d.	Navigation bar – will have Logout, Recipes, and Add Recipes
    e.	SearchBar – filter recipes

## Step 3: Timeline and Scope
1.	Backend “Server” (Python, Flask, SQLAlchemy) 
    a.	Dependencies - >1 day
    b.	Seed – 1-2 days
    c.	Models – 1-2 days
    d.	Config - >1 day
    e.	App – 1 day
    f.	Databases/Data migration - >1 day
2.	Frontend “client” (JavaScript + Vite, React, React Router) 
    a.	Dependences/installing Vite - > 1 day
    b.	Components
        i.	Navbar - >1 day
        ii.	SearchBar - >1day
        iii.	AddRecipeForm – >1 day
        iv.	Authorization – 1 day
    c.	Pages
        i.	Home/Login – 2 days
        ii.	RecipesList – 1 days
        iii.	Recipe - >1 day
        iv.	AddRecipeForm/AddRecipePage?– >1 day
    d.	App(useState/UseEffect) – 2 days
    e.	CSS – 2 days
3.	Debugging/Error handling – 1 day
4.	README – 1 day
