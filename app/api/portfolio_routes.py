from flask import Blueprint, render_template, request
from flask_login import login_required
from app.models import db, Portfolio
from app.forms import PortfolioForm
from sqlalchemy import and_, select


portfolio_routes = Blueprint('portfolio', __name__)

@portfolio_routes.route('/<int:userId>')
@login_required
def whole_portfolio(userId):
  """
  Query to obtain entire user portfolio.
  """
  portfolio = Portfolio.query.filter_by(user_id = userId)
  return {'portfolio': [stock.to_dict() for stock in portfolio]}


@portfolio_routes.route('/<int:userId>', methods=["POST"])
@login_required
def add_to_portfolo(userId):
  """
  Query to add a stock to the user's portfolio
  """
  form = PortfolioForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    new_add_stock= Portfolio(
        symbol = data["symbol"],
        user_id = data["user_id"],
        num_shares = data["num_shares"],
        average_price = data["average_price"],
    )
    db.session.add(new_add_stock)
    db.session.commit()
    return new_add_stock.to_dict()

@portfolio_routes.route('/<symbol>', methods=["PUT"])
@login_required
def update_stock(symbol):
  """
  Query to update a stock in the user's portfolio and mathmatically
  update num shares and average price
  """

  form = PortfolioForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  currStock = Portfolio.query.filter_by(
    symbol = form.data['symbol'],
    user_id = form.data['user_id']
  )
  print('the current stock',currStock)
  if form.validate_on_submit():
    portfolio = {'portfolio': [stock.to_dict() for stock in currStock]}
    temp_num_shares = portfolio['portfolio'][0]['num_shares']
    temp_average_price =portfolio['portfolio'][0]['average_price']
    portfolio['portfolio'][0]['num_shares'] =float(temp_num_shares) + float(form.data['num_shares'])
    if (float(form.data['num_shares'] > 0)):
      portfolio['portfolio'][0]['average_price'] =((float(temp_average_price)*float(temp_num_shares)) + (float(form.data['average_price'])*(abs(float(form.data['num_shares'])))))/(float(temp_num_shares) + float(form.data['num_shares']))

    currStock.num_shares = portfolio['portfolio'][0]['num_shares']
    if (currStock.num_shares > 0) :
      currStock.average_price = portfolio['portfolio'][0]['average_price']


    db.session.commit()
    return portfolio


@portfolio_routes.route('/<symbol>/redo', methods=["PUT"])
@login_required
def update_stock_redo(symbol):
  """
  Query to update a stock in the user's portfolio and mathmatically
  update num shares and average price
  """

  data = request.get_json()
  stock = Portfolio.query.get(data['id'])
  stock.num_shares = data['num_shares']
  stock.average_price = data['average_price']
  db.session.commit()
  return stock.to_dict()



  print('the current stock',currStock)
  if form.validate_on_submit():
    # currStock['num_shares'] = float(currStock['num_shares']) + float(form.data['num_shares'])
    # currStock['average_price'] = ((float(currStock['average_price'])*float(currStock['num_shares'])) + (float(form.data['average_price'])*(abs(float(form.data['num_shares'])))))/(float(currStock['num_shares']) + float(form.data['num_shares']))
    # db.session.commit()
    # # portfolio = Portfolio.query.filter_by(user_id = userId)
    portfolio = {'portfolio': [stock.to_dict() for stock in currStock]}
    temp_num_shares = portfolio['portfolio'][0]['num_shares']
    temp_average_price =portfolio['portfolio'][0]['average_price']
    portfolio['portfolio'][0]['num_shares'] =float(temp_num_shares) + float(form.data['num_shares'])
    print("HEREEEEEEEEEE",float(form.data['num_shares']))
    if (float(form.data['num_shares'] > 0)):
      portfolio['portfolio'][0]['average_price'] =((float(temp_average_price)*float(temp_num_shares)) + (float(form.data['average_price'])*(abs(float(form.data['num_shares'])))))/(float(temp_num_shares) + float(form.data['num_shares']))

    currStock.num_shares = portfolio['portfolio'][0]['num_shares']
    currStock.average_price = portfolio['portfolio'][0]['average_price']
    db.session.commit()
    return portfolio


@portfolio_routes.route('/<int:id>', methods=["DELETE"])

def delete_stock(id):
  """
  Query to delete a stock from a user's portfolio when it reaches zero shares.
  """
  form = PortfolioForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  currStock = Portfolio.query.get(id)
  db.session.delete(currStock)
  db.session.commit()
  return dict(message=f"Sold all ${form.data['symbol']} shares")
