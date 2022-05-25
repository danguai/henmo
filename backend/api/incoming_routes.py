from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from backend.forms import IncomingForm
from backend.models import db, User, Incoming
from backend.api.auth_routes import validation_errors_to_error_messages

incoming_routes = Blueprint('incomings', __name__)


# C R E A T E   N E W   I N C O M I N G
@incoming_routes.route('/new-incoming', methods = [ 'GET', 'POST' ])
# @login_required
def create_incoming():
    form = IncomingForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        incoming = Incoming(
            requester_id=form.data['requester_id'],
            sender_id=form.data['sender_id'],
            request_funds=form.data['request_funds'],
            message=form.data['message'],
            paid=form.data['paid']
            # created_at = db.Column(db.DateTime(timezone = True), server_default = func.now())
            # updated_at = db.Column(db.DateTime(timezone = True), onupdate = func.now())
        )
        db.session.add(incoming)
        db.session.commit()
        return incoming.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# R E A D   A L L   I N C O M I N G S
@incoming_routes.route('/', methods = [ 'GET' ])
# @login_required
def read_all_incomings():
    incomings = Incoming.query.all()
    # outgoings = Outgoing.query.filter(Outgoing.payer_id == current_user.id).all()

    incomings_list = [incoming.to_dict() for incoming in incomings]

    return { 'incomings': incomings_list }


# R E A D   O N E   I N C O M I N G
@incoming_routes.route('/<int:id>', methods = [ 'GET' ])
# @login_required
def read_one_incoming(id):
    incoming = Incoming.query.get(id)

    return incoming.to_dict()


# U P D A T E   I N C O M I N G
@incoming_routes.route('/<int:id>', methods = [ 'PUT' ])
# @login_required
def update_incoming(id):
    incoming = Incoming.query.get(id)

    incoming.requester_id = request.json['requester_id']
    incoming.sender_id = request.json['sender_id']
    incoming.request_funds = request.json['request_funds']
    incoming.message = request.json['message']
    incoming.paid = request.json['paid']

    db.session.commit()
    return incoming.to_dict()


# D E L E T E   I N C O M I N G
@incoming_routes.route('/<int:id>', methods = [ 'DELETE' ])
def delete_incoming(id):
    incoming = Incoming.query.get(id)

    db.session.delete(incoming)
    db.session.commit()

    return { 'id': id }
