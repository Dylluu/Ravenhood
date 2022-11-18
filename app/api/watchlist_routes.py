from flask import Blueprint, render_template, request
from flask import login_required
from app.models import Watchlist, WatchlistStocks, db

from app.forms import WatchlistForm
from app.forms import SignUpForm
from app.forms import AddStockForm

watchlist_routes = Blueprint('watchlists', __name__)

@watchlist_routes.route('')
@login_required
def get_all_watchlists():
  """
  Query for all watchlists and return them in a list of watchlist dictionaries
  """
  watchlists = Watchlist.query.all()
  return {"watchlists": [watchlist.to_dict() for watchlist in watchlists]}


@watchlist_routes.route('/<int:id>')
@login_required
def get_one_watchlist(id):
  """
  Query to get one single watchlist and return it as a dictionary
  """
  watchlist = Watchlist.query.get(id)
  return watchlist.to_dict()

@watchlist_routes.route('', methods=["POST"])
@login_required
def create_watchlist():
  """
  Allows user to create a watchlist and add it to their watchlists
  """
  totalWatchlist = Watchlist.query.all()
  form = WatchlistForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_watchlist = Watchlist(
      name = form.data['name'],
      user_id = form.data['user_id']
    )
    db.session.add(new_watchlist)
    db.session.commit()
    return new_watchlist.to_dict()

@watchlist_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_watchlist(id):
  """
  Allows user to update a watchlist with a different name
  """
  data = request.get_json()
  watchlist = Watchlist.query.get(id)
  watchlist.name = data['name']
  db.session.commit()
  return watchlist.to_dict()


@watchlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_watchlist(id):
  """
  Allows user to delete a watchlist that they have created
  """
  watchlist = Watchlist.query.get(id)
  db.session.delete(watchlist)
  db.session.commit()
  return dict(message= "Deleted a watchlist")


@watchlist_routes.route('/<int:id>/stocks')
@login_required
def get_all_watchlist_stocks(id):
  """
  Allows user to get all stocks on a watchlist
  """
  stocks = WatchlistStocks.query.all()
  return {"stocks": [stock.to_dict() for stock in stocks]}


@watchlist_routes.route('/<int:id>/stocks', methods=['POST'])
@login_required
def add_watchlist_stock(id):
  """
  Allows user to add one stock to the watchlist that they created
  """

  form = AddStockForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_stock = WatchlistStocks(
      symbol = form.data['symbol'],
      watchlist_id = form.data['watchlist_id']
    )
    db.session.add(new_stock)
    db.session.commit()
    return new_stock.to_dict()


@watchlist_routes.route('/stocks/<int:stockId>', methods=['DELETE'])
@login_required
def delete_watchlist_stock(stockId):
  """
  Allows user to delete a stock from their watchlist to remove it from the list
  """
  stock = WatchlistStocks.query.get(stockId)
  db.session.delete(stock)
  db.session.commit()
  return dict(message= "Deleted a stock")
