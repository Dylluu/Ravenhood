from flask import Blueprint, jsonify, redirect, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import UserTransactions, db
from app.forms import TransactionForm

transaction_routes = Blueprint('new_user_transaction', __name__)



# @transaction_routes.route('')
# @login_required
# def all_transactions():
#     """
#     Query for all transactions and returns them in a list of transaction dictionaries
#     """
#     transactions = UserTransactions.query.all()
#     return {'allTransactions': [transaction.to_dict() for transaction in transactions]}



@transaction_routes.route('')
@login_required
def transactions_by_user_id():
    """
    Query for all transactions and returns them in a list of transaction dictionaries
    """
    CurrentUser = current_user.id
    transactions = UserTransactions.query.filter_by(
        user_id = int(CurrentUser)
        ).all()

    transactions_dict = {}

    for transaction in transactions:
        transactions_dict[transaction.to_dict()["id"]] = transaction.to_dict()

    return transactions_dict
    # return {'myTransactions': [transaction.to_dict() for transaction in transactions]}



@transaction_routes.route('/<symbol>')
@login_required
def transactions_by_stock_and_user_id(symbol):
    """
    Query for a transaction by stock symbol and user_id and returns that transaction in a dictionary
    """
    CurrentUser = current_user.id
    LookupSymbol = symbol.upper()
    transactions = UserTransactions.query.filter_by(
        symbol=LookupSymbol,
        user_id = int(CurrentUser)
        ).all()

    transactions_dict = {}

    for transaction in transactions:
        transactions_dict[transaction.to_dict()["id"]] = transaction.to_dict()

    # print("transactions_dict", transactions_dict)
    return transactions_dict



@transaction_routes.route('<symbol>/buy', methods=["POST"])
@login_required
def create_buy_transaction(symbol):
    """
    Records the buy transaction
    """
    # CurrentUser = current_user.id
    # LookupSymbol = symbol.upper()

    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        # insert data into UserTransactions model
        new_buy_transaction_shares = UserTransactions(
            symbol = data["symbol"],
            user_id = data["user_id"],
            is_purchase = data["is_purchase"],
            num_shares = data["num_shares"],
            transaction_price = data["transaction_price"],
        )
        db.session.add(new_buy_transaction_shares)
        db.session.commit()
        return new_buy_transaction_shares.to_dict()

@transaction_routes.route('<symbol>/sell', methods=["POST"])
@login_required
def create_sell_transaction(symbol):
    """
    Records the sell transaction
    """
    # CurrentUser = current_user.id
    # LookupSymbol = symbol.upper()

    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        # insert data into UserTransactions model
        new_sell_transaction_shares = UserTransactions(
            symbol = data["symbol"],
            user_id = data["user_id"],
            is_purchase = data["is_purchase"],
            num_shares = data["num_shares"],
            transaction_price = data["transaction_price"],
        )
        db.session.add(new_sell_transaction_shares)
        db.session.commit()
        return new_sell_transaction_shares.to_dict()

# @transaction_routes.route('/<symbol>', methods=["POST"])
# @login_required
# def create_sell_transaction(symbol):
#     """
#     Records the buy transaction
#     """
#     CurrentUser = current_user.id
#     LookupSymbol = symbol.upper()

#     form = TransactionForm()
#     form['csrf_token'].data = request.cookies
#     if form.validate_on_submit():
#         data = form.data

#         if data["transaction_in"] == "Shares":
#             # insert data into UserTransactions model
#             new_sell_transaction_shares = UserTransactions(
#                 symbol = LookupSymbol,
#                 user_id = CurrentUser,
#                 is_purchase = False,
#                 num_shares = data["transaction_amount"],
#                 transaction_price = 100,
#             )

#             db.session.add(new_sell_transaction_shares)
#             db.session.commit()
#             return new_sell_transaction_shares.to_dict()

#         if data["transaction_in"] == "Dollars":
#             TransactionPrice = 100
#             inShares = data["transaction_amount"] / TransactionPrice

#             new_sell_transaction_dollars = UserTransactions(
#                 symbol = LookupSymbol,
#                 user_id = CurrentUser,
#                 is_purchase = True,
#                 num_shares = inShares,
#                 transaction_price = 100,
#             )

#             db.session.add(new_sell_transaction_dollars)
#             db.session.commit()
#             return new_sell_transaction_dollars.to_dict()
