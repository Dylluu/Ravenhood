from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Portfolio(db.Model):
    __tablename__ = 'portfolio'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(6), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    num_shares = db.Column(db.Float, nullable=False) #(integer places, decimal places)
    average_price = db.Column(db.Float, nullable=False)
    transaction_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)



    # relationship attributes
    user = db.relationship("User", back_populates="portfolio")

    def to_dict(self):
        return {
            'id': self.id,
            'symbol': self.symbol,
            'user_id': self.user_id,
            'num_shares': self.num_shares,
            'average_price': self.average_price,
            'transaction_date': self.transaction_date
        }
