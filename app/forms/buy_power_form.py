from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired
from app.models import User

class BuyPowerForm(FlaskForm):
    buy_power = IntegerField('buy_power', validators=[DataRequired()])
