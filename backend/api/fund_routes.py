from flask import Blueprint, jsonify, session, request
from flask_login import login_required

from backend.forms import FundForm
from backend.models import db, User, Fund
from backend.api.auth_routes import validation_errors_to_error_messages


fund_routes = Blueprint('funds', __name__)


# C R E A T E   F U N D S
@fund_routes.route('/add-funds', methods = [ 'GET', 'POST' ])
def create_funds():
    form = FundForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        fund = Fund(
            user_id=form.data['user_id'],
            amount=form.data['amount']
        )

        db.session.add(fund)
        db.session.commit()
        return funds.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# R E A D   F U N D S
@fund_routes.route('/<int:id>', methods = [ 'GET' ])
@login_required
def read_funds(id):
    fund = Fund.query.get(id)

    return fund.to_dict()


# U P D A T E   F U N D S
@fund_routes.route('/<int:id>', methods = [ 'PUT' ])
@login_required
def update_funds(id):
    funds = Fund.query.get(id)

    funds.user_id = request.json['user_id']
    funds.amount = request.json['amount']

    db.session.commit()
    return funds.to_dict()
