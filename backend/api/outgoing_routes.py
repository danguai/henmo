from flask import Blueprint, jsonify,session, request, redirect
from flask_login import login_required, current_user

from backend.models import User, db
from backend.forms import OutgoingForm
from backend.api.auth_routes import validation_errors_to_error_messages

outgoing_routes = Blueprint('outgoings', __name__)


# C R E A T E   N E W   O U T G O I N G
@outgoing_routes.route('/new-outgoing', methods = [ 'GET', 'POST' ])
# @login_required
def create_outgoing():
    form = OutgoingForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        outgoing = Outgoing(
            receiver_id=form.data['receiver_id'],
            pay_funds=form.data['pay_funds'],
            message=form.data['message'],
            paid=form.data['paid']
        )
        db.session.add(outgoing)
        db.session.commit()
        return outgoing.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# R E A D   A L L   O U T G O I N G S
@outgoing_routes.route('/', methods = [ 'GET' ])
@login_required
def read_all_outgoings():
    outgoings = Outgoing.query.filter(Outgoing.payer_id == current_user.id).all()

    outgoings_list = [out.to_dict() for out in outgoings]

    return { 'outgoings': outgoings_list }


# R E A D   O N E   O U T G O I N G
@outgoing_routes.route('/<int:id>', methods = [ 'GET' ])
@login_required
def read_one_outgoing(id):
    outgoing = Outgoing.query.get(id)

    return outgoing.to_dict()


# U P D A T E   O U T G O I N G
@outgoing_routes.route('/<int:id>', methods = [ 'PUt' ])
def update_outgoing(id):
    outgoing = Outgoing.query.get(id)

    receiver_id = request.json['receiver_id']
    pay_funds = request.json['pay_funds']
    message = request.json['message']
    paid = request.json['paid']

    outgoing.receiver_id = receiver_id
    outgoing.pay_funds = pay_funds
    outgoing.message = message
    outgoing.paid = paid

    db.session.commit()
    return outgoing.to_dict()


# D E L E T E   O U T G O I N G
@outgoing_routes.route('/<int:id>', methods = [ 'DELETE' ])
def delete_outgoing(id):
    outgoing = Outgoing.query.get(id)

    db.session.delete(outgoing)
    db.session.commit()

    return { 'id': id }
