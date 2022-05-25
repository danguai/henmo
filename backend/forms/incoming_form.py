from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class IncomingForm(FlaskForm):
    requester_id = IntegerField('Requester ID', validators = [DataRequired()])
    sender_id = IntegerField('Sender ID', validators = [DataRequired()])
    request_funds = IntegerField('Request Funds', validators = [DataRequired()])
    message = TextAreaField('Message', validators = [DataRequired()])
    paid = BooleanField('Paid')
