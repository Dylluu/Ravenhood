from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, SubmitField, BooleanField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not '@' in email or not '.' in email:
        raise ValidationError('Please enter a valid email address.')
    if user:
        raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')

v = [DataRequired()]
class SignUpForm(FlaskForm):
    first_name = StringField(
        'first_name', validators=[DataRequired('Please enter your first name.'), Length(min=1, max=20, message='Your first name cannot be greater than 20 characters.')])
    last_name = StringField(
        'last_name', validators=[DataRequired('Please enter your last name.'), Length(min=1, max=20, message='Your last name cannot be greater than 20 characters.')])
    email = StringField('email', validators=[DataRequired('Please enter your email.'), user_exists])
    password = StringField('password', validators=[Length(min=8, message='Your password must be at least 8 characters.')])
