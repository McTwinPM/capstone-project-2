from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from marshmallow import Schema, fields, validates_schema, ValidationError
from datetime import datetime
from config import db, bcrypt


class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    date_of_birth = Column(db.Date, nullable=False)
    _password_hash = Column("password_hash", String, nullable=False)

    drink_recipes = db.relationship('DrinkRecipe', back_populates='user', lazy=True)

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hash is not meant to be readable.")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password)
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    def __repr__(self):
        return f"<User id={self.id} username={self.username}>"
    
class DrinkRecipe(db.Model):
    __tablename__ = 'drink_recipes'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    ingredients = Column(String, nullable=False)
    instructions = Column(String, nullable=False)


    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='drink_recipes', lazy=True)

    def __repr__(self):
        return f"<DrinkRecipe id={self.id} name={self.name}>"

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    date_of_birth = fields.Date(required=True)
    password = fields.Str(load_only=True, required=True)

    @validates_schema
    def validate_date_of_birth(self, data, **kwargs):
        if 'date_of_birth' in data and data['date_of_birth'] > datetime.now().date():
            raise ValidationError("Date of birth cannot be in the future.", field_name='date_of_birth')
        if 'date_of_birth' in data and (datetime.now().date() - data['date_of_birth']).days < 21 * 365:
            raise ValidationError("User must be at least 21 years old.", field_name='date_of_birth')
    @validates_schema
    def validate_password(self, data, **kwargs):
        if 'password' in data and len(data['password']) < 6:
            raise ValidationError("Password must be at least 6 characters long.", field_name='password')
        
class DrinkRecipeSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    ingredients = fields.Str(required=True)
    instructions = fields.Str(required=True)
    user_id = fields.Int(dump_only=True)
    user = fields.Nested(UserSchema, only=['id', 'username'])

    @validates_schema
    def validate_user_id(self, data, **kwargs):
        if 'user_id' in data:
            user = User.query.get(data['user_id'])
            if not user:
                raise ValidationError("User with the given user_id does not exist.", field_name='user_id')