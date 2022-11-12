from app.models import db, WatchlistStocks, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_watchlist_stocks():
    ws1 = WatchlistStocks(
        symbol='TSLA', watchlist_id=1 )
    ws2 = WatchlistStocks(
        symbol='AAPL', watchlist_id=1 )
    ws3 = WatchlistStocks(
        symbol='NFLX', watchlist_id=1 )
    ws4 = WatchlistStocks(
        symbol='GME', watchlist_id=1 )

    db.session.add(ws1)
    db.session.add(ws2)
    db.session.add(ws3)
    db.session.add(ws4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watchlist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM watchlist_stocks")

    db.session.commit()
