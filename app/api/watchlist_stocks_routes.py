from flask import Blueprint, render_template

from app.models import Watchlist, WatchlistStocks, db

watchlist_stocks_routes = Blueprint('watchlists_stocks', __name__)

@watchlist_stocks_routes.route('<int:id>', methods=['DELETE'])

def delete_watchlist_stock(id):

  stock = WatchlistStocks.query.filter(WatchlistStocks.id==id)
  # db.session.delete(stock)
  # db.session.commit()
  return dict(message= "Deleted a stock")
