from .db import db
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    avatar_id = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    transaction_payer = db.relationship('Transaction', foreign_keys='Transaction.payer_id', back_populates='payer', lazy='dynamic')
    transaction_receiver = db.relationship('Transaction', foreign_keys='Transaction.receiver_id', back_populates='receiver', lazy='dynamic')

    comments = db.relationship('Comment', back_populates='user', cascade='all, delete')

    funds = db.relationship('Fund', back_populates='fund', cascade='all, delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'avatar_id': self.avatar_id,
            'email': self.email
        }
