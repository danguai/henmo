from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class TransactionForm(FlaskForm):
    payer_id = IntegerField('Payer ID', validators = [DataRequired()])
    receiver_id = IntegerField('Receiver ID', validators = [DataRequired()])
    amount = IntegerField('Amount', validators = [DataRequired()])
    message = TextAreaField('Message', validators = [DataRequired()])
    paid = BooleanField('Paid')
