from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import WatchlistStocks


class AddStockForm(FlaskForm):
    symbol = StringField('symbol', validators=[DataRequired()])
    watchlist_id = IntegerField('watchlist_id')
