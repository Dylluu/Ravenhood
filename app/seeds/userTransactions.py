from app.models import db, UserTransactions, environment, SCHEMA


def seed_transactions():
    t1 = UserTransactions(
        symbol='TSLA',
        user_id='1',
        is_purchase=True,
        num_shares="5",
        transaction_price=195.97)
    t2 = UserTransactions(
        symbol='AMD',
        user_id='1',
        is_purchase=True,
        num_shares="10",
        transaction_price=72.37)
    t3 = UserTransactions(
        symbol='SQ',
        user_id='1',
        is_purchase=True,
        num_shares="150",
        transaction_price=71.66)
    t4 = UserTransactions(
        symbol='AAPL',
        user_id='2',
        is_purchase=True,
        num_shares="50",
        transaction_price=149.7)
    t5 = UserTransactions(
        symbol='META',
        user_id='2',
        is_purchase=True,
        num_shares="25",
        transaction_price=113.02)
    t6 = UserTransactions(
        symbol='GOOGL',
        user_id='2',
        is_purchase=True,
        num_shares="40",
        transaction_price=96.41)
    t7 = UserTransactions(
        symbol='LCID',
        user_id='3',
        is_purchase=True,
        num_shares="500",
        transaction_price=12.91)
    t8 = UserTransactions(
        symbol='NIO',
        user_id='3',
        is_purchase=True,
        num_shares="400",
        transaction_price=11.56)
    t9 = UserTransactions(
        symbol='FSR',
        user_id='3',
        is_purchase=True,
        num_shares="1000",
        transaction_price=8.48)
    t10 = UserTransactions(
        symbol='PLTR',
        user_id='4',
        is_purchase=True,
        num_shares="1000",
        transaction_price=8.41)
    t11 = UserTransactions(
        symbol='BABA',
        user_id='4',
        is_purchase=True,
        num_shares="55",
        transaction_price=70.77)
    t12 = UserTransactions(
        symbol='JPM',
        user_id='4',
        is_purchase=True,
        num_shares="125",
        transaction_price=135.3)

    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)
    db.session.add(t6)
    db.session.add(t7)
    db.session.add(t8)
    db.session.add(t9)
    db.session.add(t10)
    db.session.add(t11)
    db.session.add(t12)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the UserTransactionss table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM user_transactions")

    db.session.commit()
