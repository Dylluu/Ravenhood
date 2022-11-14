from flask import Blueprint, render_template, request

from app.models import Watchlist, WatchlistStocks, db

watchlist_routes = Blueprint('watchlists', __name__)


@watchlist_routes.route('')

def get_all_watchlists():
  """
  Query for all watchlists and return them in a list of watchlist dictionaries
  """
  watchlists = Watchlist.query.all()
  return {"watchlists": [watchlist.to_dict() for watchlist in watchlists]}


@watchlist_routes.route('/<int:id>')
def get_one_watchlist(id):
  """
  Query to get one single watchlist and return it as a dictionary
  """
  watchlist = Watchlist.query.get(id)
  return watchlist.to_dict()

# @watchlist_routes.route('', methods=["POST"])

# def create_watchlist():
#   """
#   Allows user to create a watchlist and add it to their watchlists
#   """
#   form = WatchlistForm()
#   data = request.get_json()
#   new_watchlist = Watchlist(
#     name =data[name],
#     current_user.id
#   )

#   db.session.add(new_watchlist)
#   db.session.commit()
#   return new_watchlist.to_dict()

@watchlist_routes.route('/<int:id>', methods=["PUT"])

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

def delete_watchlist(id):
  """
  Allows user to delete a watchlist that they have created
  """
  watchlist = Watchlist.query.get(id)
  db.session.delete(watchlist)
  db.session.commit()
  return dict(message= "Deleted a watchlist")


@watchlist_routes.route('/<int:id>/stocks')

def get_all_watchlist_stocks(id):
  """
  Allows user to get all stocks on a watchlist
  """
  stocks = WatchlistStocks.query.filter(WatchlistStocks.watchlist_id == id)
  return {"stocks": [stock.to_dict() for stock in stocks]}


@watchlist_routes.route('/<int:id>/stocks', methods=['POST'])

def add_watchlist_stock(id):
  """
  Allows user to add one stock to the watchlist that they created
  """
  data = request.get_json()
  new_stock = WatchlistStocks(
    data[symbol],
    id
  )

  db.session.add(new_stock)
  db.session.commit()
  return new_stock.to_dict()


@watchlist_routes.route('/stocks/<int:stockId>', methods=['DELETE'])

def delete_watchlist_stock(stockId):
  """
  Allows user to delete a stock from their watchlist to remove it from the list
  """
  stock = WatchlistStocks.query.get(stockId)
  db.session.delete(stock)
  db.session.commit()
  return dict(message= "Deleted a stock")
