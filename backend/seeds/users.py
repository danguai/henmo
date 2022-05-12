from backend.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo',
        last_name='User',
        avatar_id=1,
        email='demoone@aa.io',
        password='password')
    user1 = User(
        first_name='Daniel',
        last_name='Blanco',
        avatar_id=2,
        email='daniel@aa.io',
        password='password')
    user2 = User(
        first_name='Brad',
        last_name='Simpson',
        avatar_id=3,
        email='simpson@aa.io',
        password='password')


    db.session.add(demo)
    db.session.add(user1)
    db.session.add(user2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
