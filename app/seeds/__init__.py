from flask.cli import AppGroup
from .users import seed_users, undo_users
from .watchlist import seed_watchlist, undo_watchlist
from .watchlistStocks import seed_watchlist_stocks, undo_watchlist_stocks
from .userTransactions import seed_transactions, undo_user_transactions
from .portfolio import seed_portfolio, undo_portfolio

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below


        undo_watchlist_stocks()
        undo_user_transactions()
        undo_portfolio()
        undo_watchlist()
        undo_users()

    seed_users()
    seed_watchlist()
    seed_watchlist_stocks()
    seed_transactions()
    seed_portfolio()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():

    undo_user_transactions()
    undo_watchlist_stocks()
    undo_portfolio()
    undo_watchlist()
    undo_users()
    # Add other undo functions here
