from flask import request, make_response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
from config import app, db, bcrypt, api
from models import User, DrinkRecipe, UserSchema, DrinkRecipeSchema
from marshmallow import ValidationError
from flask_restful import Resource
from datetime import datetime

@app.before_request
def before_request():
    open_acess_list = [
        'signup',
        'login',
        'static'
    ]

    if request.endpoint not in open_acess_list:
        try:
            verify_jwt_in_request()
        except Exception as e:
            return ({"error": "Unauthorized access"}), 401
        
class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            user_schema = UserSchema()
            user_data = user_schema.load(data)
            if User.query.filter_by(username=user_data['username']).first():
                return ({"error": "Username already exists"}), 400
            
            user = User(
                username=user_data['username'],
                date_of_birth=user_data['date_of_birth']
            )
            user.password_hash = user_data['password']
            db.session.add(user)
            db.session.commit()

            access_token = create_access_token(identity=user.id)
            return ({"message": "User created successfully", "access_token": access_token}), 201
        except ValidationError as err:
            return (err.messages, 400)

class WhoAmI(Resource):
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return ({"error": "User not found"}), 404
        
        user_schema = UserSchema()
        return (user_schema.dump(user), 200)

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()
        if not user or not user.authenticate(password):
            return ({"error": "Invalid username or password"}), 401
        
        access_token = create_access_token(identity=user.id)
        return ({"message": "Login successful", "access_token": access_token}), 200

class DrinkRecipeList(Resource):
    def get(self):
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        drink_recipes = DrinkRecipe.query.paginate(page=page, per_page=per_page, error_out=False)
        drink_recipe_schema = DrinkRecipeSchema(many=True)
        return ({
            "drink_recipes": drink_recipe_schema.dump(drink_recipes.items),
            "total": drink_recipes.total,
            "pages": drink_recipes.pages,
            "current_page": drink_recipes.page
        }), 200

    def post(self):
        try:
            data = request.get_json()
            drink_recipe_schema = DrinkRecipeSchema()
            drink_recipe_data = drink_recipe_schema.load(data)

            user = User.query.get(drink_recipe_data['user_id'])
            if not user:
                return ({"error": "User not found"}), 404
            
            drink_recipe = DrinkRecipe(
                name=drink_recipe_data['name'],
                ingredients=drink_recipe_data['ingredients'],
                instructions=drink_recipe_data['instructions'],
                user_id=drink_recipe_data['user_id']
            )
            db.session.add(drink_recipe)
            db.session.commit()

            return ({"message": "Drink recipe created successfully", "drink_recipe": drink_recipe_schema.dump(drink_recipe)}), 201
        except ValidationError as err:
            return (err.messages, 400)

class DrinkRecipeDetail(Resource):
    def get(self, recipe_id):
        drink_recipe = DrinkRecipe.query.get(recipe_id)
        if not drink_recipe:
            return ({"error": "Drink recipe not found"}), 404
        
        drink_recipe_schema = DrinkRecipeSchema()
        return (drink_recipe_schema.dump(drink_recipe), 200)

    def patch(self, recipe_id):
        drink_recipe = DrinkRecipe.query.get(recipe_id)
        if not drink_recipe:
            return ({"error": "Drink recipe not found"}), 404
        
        data = request.get_json()
        drink_recipe_schema = DrinkRecipeSchema(partial=True)
        try:
            updated_data = drink_recipe_schema.load(data)
            for key, value in updated_data.items():
                setattr(drink_recipe, key, value)
            db.session.commit()
            return ({"message": "Drink recipe updated successfully", "drink_recipe": drink_recipe_schema.dump(drink_recipe)}), 200
        except ValidationError as err:
            return (err.messages, 400)      
    def delete(self, recipe_id):
        drink_recipe = DrinkRecipe.query.get(recipe_id)
        if not drink_recipe:
            return ({"error": "Drink recipe not found"}), 404
        
        db.session.delete(drink_recipe)
        db.session.commit()
        return ({"message": "Drink recipe deleted successfully"}), 200
    
    
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(WhoAmI, '/me')
api.add_resource(DrinkRecipeList, '/drink_recipes')
api.add_resource(DrinkRecipeDetail, '/drink_recipes/<int:recipe_id>')
if __name__ == '__main__':
    app.run(port=5555, debug=True)