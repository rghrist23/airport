
# A very simple Bottle Hello World app for you to get started with...
from bottle import default_app, route
import db
import json



@route('/')
def hello_world():
    return 'Hello from Bottle!'


@route('/airline_flight/<company>')
def getAirline(company):
    return json.dumps(db.getairlineFlights(company))


@route('/user_login/<email>/<password>')
def getUser(email, password):
    return json.dumps(db.checkCustomer(email, password))

@route('/ticket_info/<email>/<password>')
def getTicketInfo(email, password):
    return json.dumps(db.checkTicket(email, password))

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

@route('/viewFlightTime')
def viewflightTime():
    return json.dumps(db.getFlightTime())

@route('/viewEmpJobs')
def viewEmpjobs():
    return json.dumps(db.getEmpJobs())

@route('/insertEmp/<empid>/<empname>/<empphone>/<empsal>/<empjob>')
def insertEmp(empid, empname, empphone, empsal, empjob):
    db.insertEmp(empid,empname,empphone,empsal,empjob)


##@route('/test/<flightnumber>/<passenger>')
##def getData(flightnumber, passenger):
##    return json.dumps(db.getDataTest(flightnumber, passenger))



application = default_app()

