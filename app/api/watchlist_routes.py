from flask import Blueprint, render_template

from app.models import Watchlist

watchlist_routes = Blueprint('watchlists', __name__)


@watchlist_routes.route('/')

def watchlist():
  """
  Query for all watchlists and return them in a list of 
  """
