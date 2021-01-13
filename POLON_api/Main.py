import mysql.connector   
import io
import POLON_api
import POLON_employees
import MySQL_connection

PATENTS = POLON_api.Patents()
PERSONS = POLON_employees.Persons()
DATABASE = MySQL_connection.Database()

#   pobierz wszystkie dostępne patenty z POLONa
PATENTS.save_patents()  

#   wyszukaj wymienione w patencie osoby w bazie danych 
PERSONS.save_persons(PATENTS)

DATABASE.add_patents(PATENTS)
DATABASE.add_institutions(PERSONS)
DATABASE.add_persons(PERSONS)


#with io.open("saved_patents.txt", "w+", encoding="utf-8") as filehandle:
#    for key, value in PATENTS.Patents.items():
#        filehandle.write('%s %s\n' % (key, value))