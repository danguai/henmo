from backend.models import db, Fund

def seed_funds():

    fund_01 = Fund(
        user_id=1,
        capital=60,
    )
    fund_02 = Fund(
        user_id=2,
        capital=12,
    )
    fund_03 = Fund(
        user_id=3,
        capital=79,
    )

    db.session.add(fund_01)
    db.session.add(fund_02)
    db.session.add(fund_03)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_funds():
    db.session.execute('TRUNCATE funds RESTART IDENTITY CASCADE;')
    db.session.commit()
