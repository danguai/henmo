from backend.models import db, Comment

# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment_01 = Comment(
        user_id=1,
        outgoing_id=2,
        message='This is comment 1'
    )
    comment_02 = Comment(
        user_id=2,
        outgoing_id=3,
        message='this is the second comment'
    )
    comment_03 = Comment(
        user_id=3,
        outgoing_id=2,
        message='this comment comes from the seeder'
    )
    db.session.add(comment_01)
    db.session.add(comment_02)
    db.session.add(comment_03)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
