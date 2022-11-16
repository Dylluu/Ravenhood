from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, SubmitField, BooleanField, IntegerField, TextAreaField, FloatField
from wtforms.validators import DataRequired

v = [DataRequired()]
c = ["Shares", "Dollars"]

class TransactionForm(FlaskForm):
    transaction_in = SelectField('transaction_in', choices=c)
    transaction_amount = FloatField('transaction_amount', v)
    submit = SubmitField("submit")
