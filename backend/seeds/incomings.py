from backend.models import db, Incoming


# Adds a demo user, you can add other users here if you want
def seed_incomings():

    incoming_01 = Incoming(
        requester_id=1,
        sender_id=2,
        request_funds=4,
        message='Send me my chickens',
        paid=True
    )
    incoming_02 = Incoming(
        requester_id=1,
        sender_id=3,
        request_funds=12,
        message='What are you waiting for',
        paid=False
    )
    incoming_03 = Incoming(
        requester_id=1,
        sender_id=2,
        request_funds=7,
        message='Just pay me!!!',
        paid=True
    )

    db.session.add(incoming_01)
    db.session.add(incoming_02)
    db.session.add(incoming_03)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_incomings():
    db.session.execute('TRUNCATE incomings RESTART IDENTITY CASCADE;')
    db.session.commit()
