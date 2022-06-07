from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from backend.forms import CommentForm
from backend.models import db, User, Comment
from backend.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)


# C R E A T E   N E W   C O M M E N T
@comment_routes.route('/new-comment', methods = [ 'GET', 'POST' ])
# @login_required
def create_comment():
    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=form.data['user_id'],
            transaction_id=form.data['transaction_id'],
            message=form.data['message'],
        )

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# R E A D   A L L   C O M M E N T S
@comment_routes.route('/', methods = [ 'GET' ])
# @login_required
def read_all_comments():
    comments = Comment.query.all()
    # comments = Comment.query.filter(Comment.user_id == current_user.id).all()

    comments_list = [comment.to_dict() for comment in comments]

    return { 'comments': comments_list }


# U P D A T E   C O M M E N T
@comment_routes.route('/<int:id>', methods = [ 'PUT' ])
# @login_required
def update_comment(id):
    comment = Comment.query.get(id)

    comment.user_id = request.json['user_id']
    comment.transaction_id = request.json['transaction_id']
    comment.message = request.json['message']

    db.session.commit()
    return comment.to_dict()


# D E L E T E   C O M M E N T
@comment_routes.route('/<int:id>', methods = [ 'DELETE' ])
def delete_comment(id):
    comment = Comment.query.get(id)

    db.session.delete(comment)
    db.session.commit()

    return { 'id': id }
