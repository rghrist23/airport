import sqlite3


def getairlineFlights(company):
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev6.db")
    cursor = conn.cursor()
    cursor.execute('SELECT flight_number, destination, departure_time, gate, airline_name, call_sign FROM flight, plane WHERE flight.plane_id = plane.plane_id AND plane.airline_name = "%s"' % (company))
    return cursor.fetchall()


def getUserFlight(username):
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev6.db")
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM ticket JOIN flight on ticket.flight_number = flight.flight_number WHERE ticket.customer_id = "%s" ORDER BY flight.date DESCENDING' % (username))
    return cursor.fetchall()


def getFlightNumber(flightNumber):
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev6.db")
    cursor = conn.cursor()
    cursor.execute('SELECT flight_number, gate, arrival_time, departure_time, plane.airline_name, date FROM flight, plane WHERE flight.plane_id = plane.plane_id AND flight.flight_number = "%s"' % (flightNumber))
    return cursor.fetchall()


def checkCustomer(email, password):
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev6.db")
    cursor = conn.cursor()
    cursor.execute('SELECT customer_id, name FROM customers WHERE email = "%s" AND customer_password = "%s"' % (email, password))
    return cursor.fetchall()

def checkTicket(email, password):
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev6.db")
    cursor = conn.cursor()
    cursor.execute('SELECT flight.flight_number, flight.gate, flight.arrival_time, flight.departure_time, flight.date, ticket.ticket_number FROM customers, ticket, flight WHERE ticket.customer_id = customers.customer_id AND ticket.flight_number = flight.flight_number AND customers.email = "%s" AND customer_password = "%s"' % (email, password))
    return cursor.fetchall()

def getAirlines():
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev6.db")
    cursor = conn.cursor()
    cursor.execute('SELECT flight_number, airline_name, date, destination FROM flight JOIN plane WHERE flight.plane_id = plane.plane_id')
    return cursor.fetchall()

def getBiz():
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev6.db")
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM businesses')
    return cursor.fetchall()

def getEmp():
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev6.db")
    cursor = conn.cursor()
    cursor.execute('SELECT employee_id, name, salary, security_level, job_position FROM staff')
    return cursor.fetchall()

def getFlightTime():
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev6.db")
    cursor = conn.cursor()
    cursor.execute('SELECT departure_time FROM flight')
    return cursor.fetchall()

def getEmpJobs():
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev6.db")
    cursor = conn.cursor()
    cursor.execute('SELECT job_position FROM staff')
    return cursor.fetchall()

def insertEmp(empID, empName, empPhone, empSal, empPos):
    conn = sqlite3.connect("/home/rghrist23/airport/Management App/AMS_Database_Rev6.db")
    cursor = conn.cursor()
    cursor.execute('INSERT INTO staff (employee_id, name, phone_number, salary, job_position) VALUES ("%s", "%s", "%s", "%s", "%s")' % (empID, empName, empPhone, empSal, empPos))