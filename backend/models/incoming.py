# from .db import db
# from sqlalchemy.sql import func


# class Incoming(db.Model):
#     __tablename__ = 'incomings'

#     id = db.Column(db.Integer, primary_key = True)
#     message = db.Column(db.Text, nullable=False)
#     paid = db.Column(db.Boolean, nullable=False)
#     request_funds = db.Column(db.Integer, nullable = False)
#     created_at  = db.Column(db.DateTime(timezone = True), server_default = func.now())
#     updated_at  = db.Column(db.DateTime(timezone = True), onupdate = func.now())

#     requester_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
#     sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

#     requester = db.relationship('User', foreign_keys=[requester_id], back_populates='incoming_requester')
#     sender = db.relationship('User', foreign_keys=[sender_id], back_populates='incoming_sender')

#     comments = db.relationship('Comment', back_populates='outgoing', cascade="all, delete")

#     approved_outgoing = db.relationship('Outgoing', back_populates='approved_incoming', secondary=approved_transactions)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'requester_id': self.requester_id,
#             'sender_id': self.sender_id,
#             'request_funds': self.request_funds,
#             'message': self.message,
#             'paid': self.paid,
#             'created_at': self.created_at,
#             'updated_at': self.updated_at,
#             'approved_outgoint': self.approved_outgoing,
#             'requester': self.requester.to_dict(),
#             'sender': self.sender.to_dict()
#         }
