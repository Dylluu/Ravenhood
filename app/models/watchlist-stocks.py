from .db import db, environment, SCHEMA, add_prefix_for_prod

class WatchlistStocks(db.Model):

  __tablename__= 'watchlist_stocks'

  if environment == "production":
    __table_args__={'schema': SCHEMA}


  id = db.Column(db.Integer, primary_key=True)
  symbol = db.Column(db.String(6), nullable=False)
  watchlist_id = db.Column(db.Integer, db.ForeignKey('watchlists.id'), nullable=False)

  def to_dict(self):
    return {
      'id': self.id,
      'symbol': self.symbol,
      'watchlist_id': self.watchlist_id
    }
