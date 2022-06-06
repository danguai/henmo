from .db import db
from sqlalchemy.sql import func


class Fund(db.Model):
    __tablename__ = 'funds'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.Integer, nullable = False)

    user = db.relationship('User', back_populates = 'funds')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'amount': self.amount
        }
