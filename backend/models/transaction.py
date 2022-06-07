from .db import db
from sqlalchemy.sql import func


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key = True)
    message = db.Column(db.Text, nullable=False)
    paid = db.Column(db.Boolean, nullable=False)
    amount = db.Column(db.Integer, nullable = False)
    created_at  = db.Column(db.DateTime(timezone = True), server_default = func.now())
    updated_at  = db.Column(db.DateTime(timezone = True), onupdate = func.now())

    payer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

    payer = db.relationship('User', foreign_keys=[payer_id], back_populates='transaction_payer')
    receiver = db.relationship('User', foreign_keys=[receiver_id], back_populates='transaction_receiver')

    comments = db.relationship('Comment', back_populates='transaction', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'payer_id': self.payer_id,
            'receiver_id': self.receiver_id,
            'amount': self.amount,
            'message': self.message,
            'paid': self.paid,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'payer': self.payer.to_dict(),
            'receiver': self.receiver.to_dict()
        }
