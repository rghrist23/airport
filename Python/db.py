import sqlite3


def getairlineFlights(company):
    conn = sqlite3.connect("/home/rghrist23/mysite/AMS_Database_v1.db")
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM flight join terminal on flight.flight_number = terminal.flight_number WHERE airline_name = "%s"' % (company))
    return cursor.fetchall()


def getUserFlight(username):
    conn = sqlite3.connect("/home/rghrist23/mysite/AMS_Database_v1.db")
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM ticket JOIN flight on ticket.flight_number = flight.flight_number WHERE ticket.customer_id = "%s" ORDER BY flight.date DESCENDING' % (username))
    return cursor.fetchall()


def getFlightNumber(flightNumber):
    conn = sqlite3.connect("/home/rghrist23/mysite/AMS_Database_v1.db")
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM flight JOIN terminal on flight.flight_number = terminal.flight_number  WHERE flight.flight_number = "%s"' %(flightNumber))
    return cursor.fetchall()


def checkCustomer(username, password):
    conn = sqlite3.connect("/home/rghrist23/mysite/AMS_Database_v1.db")
    cursor = conn.cursor()
    cursor.execute('SELECT customer_id FROM customer WHERE customer_username = "%s" and customer_password = "%s"' % (username, password))
    return cursor.fetchall()
