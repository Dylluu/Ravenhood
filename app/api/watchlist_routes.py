from flask import Blueprint, render_template

from app.models import Watchlist

watchlist_routes = Blueprint('watchlists', __name__)


@watchlist_routes.route('/')

def get_all_watchlists():
  """
  Query for all watchlists and return them in a list of watchlist dictionaries
  """
  watchlists = Watchlist.query.all()
  return {"watchlists": [watchlist.to_dict() for watchlist in watchlists]}


@watchlist_routes.route('/<id>')
def get_one_watchlist(id):
  """
  Query to get one single watchlist and return it as a dictionary
  """
  watchlist = Watchlist.query.get(id)
  return watchlist.todict()

@watchlist_routes.route('/', methods=["POST"])

def create_watchlist():
  """
  Allows user to create a watchlist and add it to their watchlists
  """
  def post_watchlist():
    data = request.get_json()
    new_watchlist = Watchlist(
      name=data[name]
      user_id= session.user_id
      # either session.user_id or is it stored in data somewhere?
    )

    db.session.add(new_watchlist)
    db.session.commit()
    return new_watchlist.to_dict()

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
