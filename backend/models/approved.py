from backend.models.db import db

approved_transactions = db.Table(
    'approved_transactions',
    db.Column('incoming_id', db.Integer, db.ForeignKey('incoming.id'), primary_key=True),
    db.Column('outgoing_id', db.Integer, db.ForeignKey('outgoing.id'), primary_key=True)
)
