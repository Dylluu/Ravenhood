from flask_wtf import FlaskForm
from wtforms import FloatField
from wtforms.validators import DataRequired
from app.models import User

class BuyPowerForm(FlaskForm):
    buy_power = FloatField('buy_power', validators=[DataRequired()])
