from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey

class WatchlistStocks(db.Model):

  __tablename__= 'watchlist_stocks'

  if environment == "production":
    __table_args__={'schema': SCHEMA}


  id = db.Column(db.Integer, primary_key=True)
  symbol = db.Column(db.String(7), nullable=False, unique=True)
  watchlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('watchlists.id')), nullable=False)
  watchlist = relationship("Watchlist", back_populates="watchlist_stocks")

  def to_dict(self):
    return {
      'id': self.id,
      'symbol': self.symbol,
      'watchlist_id': self.watchlist_id
    }
