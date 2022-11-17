from app.models import db, Portfolio, environment, SCHEMA


def seed_portfolio():

    tsla = Portfolio(
      symbol="TSLA", user_id=1, num_shares=10, average_price=187.85
    )
    # look up python docs for datetime
    nvda= Portfolio(
      symbol="NVDA", user_id=1, num_shares=15, average_price=162.60
    )
    aapl = Portfolio(
      symbol="AAPL", user_id=1, num_shares=12, average_price=148.90
    )
    lcid = Portfolio(
      symbol="LCID", user_id=1, num_shares=30, average_price=11.50
    )
    amzn = Portfolio(
      symbol="AMZN", user_id=1, num_shares=25, average_price=97.60
    )

    db.session.add(tsla)
    db.session.add(nvda)
    db.session.add(aapl)
    db.session.add(lcid)
    db.session.add(amzn)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_portfolio():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolio RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM portfolio")

    db.session.commit()
