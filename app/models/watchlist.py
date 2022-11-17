from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
class Watchlist(db.Model):

  __tablename__= 'watchlists'

  if environment == "production":
    __table_args__={'schema': SCHEMA}


  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  watchlist_stocks = relationship("WatchlistStocks", back_populates="watchlist", cascade="all, delete-orphan" )
  # not sure if its user/users

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'user_id': self.user_id,
    }
