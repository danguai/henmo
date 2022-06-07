from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    user_id = IntegerField('User ID', validators = [DataRequired()])
    transaction_id = IntegerField('Transaction ID', validators = [DataRequired()])
    message = TextAreaField('Message', validators = [DataRequired()])
