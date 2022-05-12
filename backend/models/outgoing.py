from .db import db
from sqlalchemy.sql import func


class Outgoing(db.Model):
    __tablename__ = 'outgoings'

    id = db.Column(db.Integer, primary_key = True)
    message = db.Column(db.Text, nullable=False)
    paid = db.Column(db.Boolean, nullable=False)
    pay_funds = db.Column(db.Integer, nullable = False)

    payer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

    payer = db.relationship('User', foreign_keys=[payer_id], back_populates='outgoing_payer')
    receiver = db.relationship('User', foreign_keys=[receiver_id], back_populates='outgoing_receiver')

    # comments = db.relationship('Comment', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'payer_id': self.payer_id,
            'receiver_id': self.receiver_id,
            'pay_funds': self.pay_funds,
            'message': self.message,
            'paid': self.paid
        }
