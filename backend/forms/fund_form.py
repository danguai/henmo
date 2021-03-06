from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class FundForm(FlaskForm):
    user_id = IntegerField('User ID', validators = [DataRequired()])
    amount = IntegerField('Amount', validators = [DataRequired()])
