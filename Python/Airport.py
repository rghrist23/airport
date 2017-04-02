
# A very simple Bottle Hello World app for you to get started with...
from bottle import default_app, route
import db
import json



@route('/')
def hello_world():
    return 'Hello from Bottle! KOTAKsefoseofoeU'


@route('/airline_flight/<company>')
def getAirline(company):
    return json.dumps(db.getairlineFlights(company))


@route('/user_login')
def getUser():
    return 0


@route('/flight_number/<flight>')
def getFlight(flight):
    return json.dumps(db.getFlightNumber(flight))


@route('/viewFlights')
def viewFlights():
    return json.dumps(db.getAirlines())

@route('/viewBiz')
def viewBiz():
    return json.dumps(db.getBiz())

@route('/viewEmp')
def viewEmp():
    return json.dumps(db.getEmp())



application = default_app()

