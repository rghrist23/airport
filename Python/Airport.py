
# A very simple Bottle Hello World app for you to get started with...
from bottle import route, run, template
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


@route('/manager_permissions')
def helloshabrina():
    return 'Hello Shabrina'

run(host='localhost', port=8010)

