from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.forms import BuyPowerForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}



@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()



@user_routes.route("BP/<int:id>", methods=["PUT"])
@login_required
def editBuyPower(id):
    """
    Add buy power for current user
    """
    form = BuyPowerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    currUser = User.query.get(id)
    print("WOWWWWWWW", currUser)
    if form.validate_on_submit():
        currUser.buy_power += form.data['buy_power']
        print("HUHHHHH?", form.data['buy_power'])
        db.session.commit()
        return currUser.to_dict()
# @user_routes.routes("/new", methods=["GET", "POST"])
# def add_user():
