from random import choice, randint
from faker import Faker
from models import db, User, DrinkRecipe
from app import app
import os

fake = Faker()

with app.app_context():
    print("Deleting existing data...")
    DrinkRecipe.query.delete()
    User.query.delete()

    fake = Faker()

    print("Creating users...")
    users = []
    usernames = []

    for i in range(10):
        username = fake.user_name()
        while username in usernames:
            username = fake.user_name()
        usernames.append(username)

        user = User(
            username=username,
            date_of_birth=fake.date_of_birth(minimum_age=21, maximum_age=90)
        )
        user.password_hash = user.username + 'password'

        users.append(user)
    db.session.add_all(users)
    db.session.commit()
    print("Creating drink recipes...")
    drink_recipes = []
    for i in range(30):
        drink_recipe = DrinkRecipe(
            name=fake.catch_phrase(),
            ingredients=fake.text(max_nb_chars=200),
            instructions=fake.text(max_nb_chars=500),
            user_id=choice(users).id
        )
        drink_recipes.append(drink_recipe)
    db.session.add_all(drink_recipes)
    db.session.commit()
    print("Seeding complete!")