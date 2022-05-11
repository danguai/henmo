from backend.models import db, Outgoing


# Adds a demo user, you can add other users here if you want
def seed_outgoings():

    outgoing_01 = Outgoing(
        payer_id=1,
        receiver_id=2,
        pay_funds=4,
        message='This chickens are very quiet',
        paid=True
    )
    outgoing_02 = Outgoing(
        payer_id=1,
        receiver_id=3,
        pay_funds=12,
        message='The crazy chickens all around',
        paid=False
    )
    outgoing_03 = Outgoing(
        payer_id=1,
        receiver_id=2,
        pay_funds=7,
        message='I want to have so many chickens',
        paid=True
    )

    db.session.add(outgoing_01)
    db.session.add(outgoing_02)
    db.session.add(outgoing_03)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_outgoings():
    db.session.execute('TRUNCATE outgoings RESTART IDENTITY CASCADE;')
    db.session.commit()
