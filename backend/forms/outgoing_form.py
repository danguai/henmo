from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired


class OutgoingForm(FlaskForm):
    payer_id = IntegerField('Receiver ID', validators = [DataRequired()])
    receiver_id = IntegerField('Receiver ID', validators = [DataRequired()])
    pay_funds = IntegerField('Pay Funds', validators = [DataRequired()])
    message = TextAreaField('Message', validators = [DataRequired()])
    paid = BooleanField('Paid', validators = [DataRequired()])
