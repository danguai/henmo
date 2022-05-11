from .db import db
from sqlalchemy.sql import func

class Outgoing(db.Model):
    __tablename__ = 'outgoings'

    id = db.Column(db.Integer, primary_key = True)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    pay_funds = db.Column(db.Integer, nullable = False)
    message = db.Column(db.Text, nullable=False)
    paid = db.Column(db.Boolean, nullable=False)

    user = db.relationship('User', back_populates='outgoings')

    # comments = db.relationship('Comment', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'receiver_id': self.receiver_id,
            'pay_funds': self.pay_funds,
            'message': self.message,
            'paid': self.paid
        }
