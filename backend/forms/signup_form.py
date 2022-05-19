from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from backend.models import User

# import re

# regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')


# def isValid(email):
#     if re.fullmatch(regex, email):
#         print("Valid email")
#     else:
#         raise ValidationError('Invalid Email')


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def avatar_select(form, field):
    avatar_id = field.data
    # avatar = User.query.filter(User.avatar_id == avatar_id).first()
    if avatar_id is False:
        raise ValidationError('You must choose a chicken avatar.')

# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired('You must enter a First Name')])
    last_name = StringField('Last Name', validators=[DataRequired('You must enter a Last Name')])
    avatar_id = IntegerField('Avatar ID', validators=[DataRequired('You must choose a chicken avatar.')])
    email = StringField('Email', validators=[DataRequired(), user_exists, Email()])
    password = StringField('Password', validators=[DataRequired()])
