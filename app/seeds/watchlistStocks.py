from app.models import db, WatchlistStocks, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_watchlist_stocks():
    ws1 = WatchlistStocks(
        symbol='TSLA', watchlist_id=1 )
    ws2 = WatchlistStocks(
        symbol='AAPL', watchlist_id=1 )
    ws4 = WatchlistStocks(
        symbol='GME', watchlist_id=1 )
    ws5 = WatchlistStocks(
        symbol='AMZN', watchlist_id=3 )
    ws6 = WatchlistStocks(
        symbol='NVDA', watchlist_id=3 )
    ws7 = WatchlistStocks(
        symbol='AAPL', watchlist_id=3 )
    ws8 = WatchlistStocks(
        symbol='AMD', watchlist_id=3 )
    ws9 = WatchlistStocks(
        symbol='MSFT', watchlist_id=2 )
    ws10 = WatchlistStocks(
        symbol='META', watchlist_id=2 )
    ws11 = WatchlistStocks(
        symbol='GOOGL', watchlist_id=2 )
    ws12 = WatchlistStocks(
        symbol='UNH', watchlist_id=2 )
    ws13 = WatchlistStocks(
        symbol='MSFT', watchlist_id=4 )
    ws14 = WatchlistStocks(
        symbol='META', watchlist_id=4 )
    ws15 = WatchlistStocks(
        symbol='GOOGL', watchlist_id=4 )
    ws16 = WatchlistStocks(
        symbol='OXY', watchlist_id=4 )
    wsr1 = WatchlistStocks(
        symbol='TSLA', watchlist_id=5 )
    wsr2 = WatchlistStocks(
        symbol='AAPL', watchlist_id=5 )
    wsr4 = WatchlistStocks(
        symbol='GME', watchlist_id=5 )
    wsr5 = WatchlistStocks(
        symbol='AMZN', watchlist_id=5 )
    wsr6 = WatchlistStocks(
        symbol='NVDA', watchlist_id=5 )
    wsr7 = WatchlistStocks(
        symbol='AAPL', watchlist_id=5 )
    wsr8 = WatchlistStocks(
        symbol='AMD', watchlist_id=5)


    db.session.add(ws1)
    db.session.add(ws2)
    db.session.add(ws4)
    db.session.add(ws5)
    db.session.add(ws6)
    db.session.add(ws7)
    db.session.add(ws8)
    db.session.add(ws9)
    db.session.add(ws10)
    db.session.add(ws11)
    db.session.add(ws12)
    db.session.add(ws13)
    db.session.add(ws14)
    db.session.add(ws15)
    db.session.add(ws16)
    db.session.add(wsr1)
    db.session.add(wsr2)
    db.session.add(wsr4)
    db.session.add(wsr5)
    db.session.add(wsr6)
    db.session.add(wsr7)
    db.session.add(wsr8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM watchlist_stocks")

    db.session.commit()
