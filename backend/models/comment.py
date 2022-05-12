from .db import db
from sqlalchemy.sql import func


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    outgoing_id = db.Column(db.Integer, db.ForeignKey('outgoings.id'), nullable = False)
    message = db.Column(db.Text, nullable = False)
    created_at  = db.Column(db.DateTime(timezone = True), server_default = func.now())
    updated_at  = db.Column(db.DateTime(timezone = True), onupdate = func.now())

    outgoing = db.relationship('Outgoing', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'outgoing_id': self.outgoing_id,
            'message': self.message,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
