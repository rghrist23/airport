import sqlite3


def getairlineFlights(company):
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev5.db")
    cursor = conn.cursor()
    cursor.execute('SELECT flight_number, destination, departure_time, gate, airline_name, call_sign FROM flight, plane WHERE flight.plane_id = plane.plane_id AND plane.airline_name = "%s"' % (company))
    return cursor.fetchall()


def getUserFlight(username):
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev5.db")
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM ticket JOIN flight on ticket.flight_number = flight.flight_number WHERE ticket.customer_id = "%s" ORDER BY flight.date DESCENDING' % (username))
    return cursor.fetchall()


def getFlightNumber(flightNumber):
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev5.db")
    cursor = conn.cursor()
    cursor.execute('SELECT flight_number, gate, arrival_time, departure_time, plane.airline_name, date FROM flight, plane WHERE flight.plane_id = plane.plane_id AND flight.flight_number = "%s"' % (flightNumber))
    return cursor.fetchall()


def checkCustomer(username, password):
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev5.db")
    cursor = conn.cursor()
    cursor.execute('SELECT customer_id FROM customer WHERE customer_username = "%s" and customer_password = "%s"' % (username, password))
    return cursor.fetchall()

def getAirlines():
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev5.db")
    cursor = conn.cursor()
    cursor.execute('SELECT flight_number, airline_name, date, destination FROM flight JOIN plane WHERE flight.plane_id = plane.plane_id')
    return cursor.fetchall()

def getBiz():
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev5.db")
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM businesses')
    return cursor.fetchall()

def getEmp():
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev5.db")
    cursor = conn.cursor()
    cursor.execute('SELECT employee_id, name, salary, security_level, job_position FROM staff')
    return cursor.fetchall()
