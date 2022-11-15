from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class UserTransactions(db.Model):
    __tablename__ = 'user_transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(6), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    is_purchase = db.Column(db.Boolean, nullable=False)
    num_shares = db.Column(db.Integer, nullable=False) #(integer places, decimal places)
    transaction_price = db.Column(db.Float, nullable=False)
    transaction_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)



    # relationship attributes
    user = db.relationship("User", back_populates="user_transactions")



    def to_dict(self):
        return {
            'id': self.id,
            'symbol': self.symbol,
            'user_id': self.user_id,
            'is_purchase': self.is_purchase,
            'num_shares': self.num_shares,
            'transaction_price': self.transaction_price,
            'transaction_date': self.transaction_date
        }
