from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from backend.forms import TransactionForm
from backend.models import db, User, Transaction
from backend.api.auth_routes import validation_errors_to_error_messages

transaction_routes = Blueprint('transactions', __name__)


# C R E A T E   N E W   T R A N S A C T I O N
@transaction_routes.route('/new-transaction', methods = [ 'GET', 'POST' ])
# @login_required
def create_transaction():
    form = TransactionForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        transaction = Transaction(
            payer_id=form.data['payer_id'],
            receiver_id=form.data['receiver_id'],
            amount=form.data['amount'],
            message=form.data['message'],
            paid=form.data['paid']
            # created_at = db.Column(db.DateTime(timezone = True), server_default = func.now())
            # updated_at = db.Column(db.DateTime(timezone = True), onupdate = func.now())
        )
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# R E A D   A L L   T R A N S A C T I O N S
@transaction_routes.route('/', methods = [ 'GET' ])
# @login_required
def read_all_transactions():
    transactions = Transaction.query.all()
    # transactions = Transaction.query.filter(Transaction.payer_id == current_user.id).all()

    transactions_list = [transaction.to_dict() for transaction in transactions]

    return { 'transactions': transactions_list }


# R E A D   O N E   T R A N S A C T I O N
@transaction_routes.route('/<int:id>', methods = [ 'GET' ])
# @login_required
def read_one_transaction(id):
    transaction = Transaction.query.get(id)

    return transaction.to_dict()


# U P D A T E   T R A N S A C T I O N
@transaction_routes.route('/<int:id>', methods = [ 'PUT' ])
# @login_required
def update_transaction(id):
    transaction = Transaction.query.get(id)

    transaction.payer_id = request.json['payer_id']
    transaction.receiver_id = request.json['receiver_id']
    transaction.amount = request.json['amount']
    transaction.message = request.json['message']
    transaction.paid = request.json['paid']

    db.session.commit()
    return transaction.to_dict()


# D E L E T E   T R A N S A C T I O N
@transaction_routes.route('/<int:id>', methods = [ 'DELETE' ])
def delete_transaction(id):
    transaction = Transaction.query.get(id)

    db.session.delete(transaction)
    db.session.commit()

    return { 'id': id }
