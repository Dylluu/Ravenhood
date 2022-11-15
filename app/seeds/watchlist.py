from app.models import db, User, Watchlist, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_watchlist():
    w1 = Watchlist(
        name='First Watchlist', user_id=1 )
    w2 = Watchlist(
        name='STONKS', user_id=2 )
    w3 = Watchlist(
        name='High Risk High Reward', user_id=1 )
    w4 = Watchlist(
        name='Money Moves', user_id=2 )

    db.session.add(w1)
    db.session.add(w2)
    db.session.add(w3)
    db.session.add(w4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watchlist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM watchlists")

    db.session.commit()
