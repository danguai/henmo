from flask import Blueprint, jsonify
from flask_login import login_required

from backend.models import db, User, Fund

fund_routes = Blueprint('funds', __name__)

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
    fund = Fund.query.get(id)

    fund.user_id = request.json['user_id']
    fund.amount = request.json['amount']
    db.session.commit()
    return funds.to_dict()
