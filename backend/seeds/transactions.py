from backend.models import db, Transaction


# Adds a demo user, you can add other users here if you want
def seed_transactions():

    transaction_01 = Transaction(
        payer_id=1,
        receiver_id=2,
        amount=4,
        message='This chickens are very quiet',
        paid=True
    )
    transaction_02 = Transaction(
        payer_id=1,
        receiver_id=3,
        amount=12,
        message='The crazy chickens all around',
        paid=False
    )
    transaction_03 = Transaction(
        payer_id=1,
        receiver_id=2,
        amount=7,
        message='I want to have so many chickens',
        paid=True
    )

    db.session.add(transaction_01)
    db.session.add(transaction_02)
    db.session.add(transaction_03)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
