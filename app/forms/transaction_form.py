from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, SubmitField, BooleanField, IntegerField, TextAreaField, FloatField
from wtforms.validators import DataRequired

v = [DataRequired()]
c = ["Shares", "Dollars"]

class TransactionForm(FlaskForm):
    symbol = StringField("symbol", v)
    user_id = IntegerField("user_id", v)
    is_purchase = BooleanField("is_purchase")
    num_shares = FloatField("num_shares", v)
    transaction_price = FloatField('transaction_price', v)
    submit = SubmitField("submit")
