from flask import Blueprint, jsonify
from flask_login import login_required

from backend.models import User, Fund
from backend.forms import FundsForm

user_routes = Blueprint('users', __name__)
fund_routes = Blueprint('funds', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# C R E A T E   F U N D S
@fund_routes.route('/', methods = [ 'GET', 'POST' ])
def create_funds():
    fund = FundsForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        fund = Fund(
            user_id=form.data['user_id'],
            capital=form.data['capital']
        )
        db.session.add(fund)
        db.session.commit()

        return fund.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# R E A D   F U N D S
@fund_routes.route('/<int:id>', methods = [ 'GET' ])
def read_funds(id):
    funds = Funds.query.get(id)

    return funds.to_dict()


# U P D A T E   F U N D S
@fund_routes.route('/<int:id>', methods = [ 'PUT' ])
def update_funds(id):
    funds = Funds.query.get(id)

    funds.user_id = request.json['user_id']
    funds.capital = request.json['capital']

    db.session.commit()
    return funds.to_dict()
