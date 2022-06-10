from flask import Blueprint, jsonify, session, request
from flask_login import login_required

from backend.models import User

user_routes = Blueprint('users', __name__)


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


@user_routes.route('/signup', methods=['PUT'])
def user_update(id):
    user = User.query.get(id)

    user.first_name = request.json['first_name']
    user.last_name = request.json['last_name']
    user.avatar_id = request.json['avatar_id']

    db.session.commit()
    return user.to_dict()
