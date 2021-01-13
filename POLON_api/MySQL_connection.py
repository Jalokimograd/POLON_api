import mysql.connector
import datetime    


class Database:
    def __init__(self):
        self.mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="",
            database="polon" # bez tego jesteśmy o stopień wyżej
        )

        self.mycursor = self.mydb.cursor()
    
    
    def add_patents(self, Patents):
        patents = Patents.Patents
        sqlFormula = "INSERT INTO patents (id, title, type, date) VALUES (%s, %s, %s, %s)"
        
        for key, patent in patents.items():         
            patent_data = (key, patent['title'], patent['type'], patent['date'])
            self.mycursor.execute(sqlFormula, patent_data)

        self.mydb.commit()
        print("zapisano w BD patenty")



    def add_institutions(self, Persons):
        sqlFormula = "INSERT INTO institutions (id, institutionName) VALUES (%s, %s)"

        for key, value in Persons.Institutions.items():
            self.mycursor.execute(sqlFormula, (key, value))
        self.mydb.commit()

        print("zapisano w BD instytucje")


    def add_persons(self, Persons):
        persons = []
        persons.append(Persons.recognized_persons)
        persons.append(Persons.unrecognized_persons)
        i = 1
        for key, value in persons[1].items():
            value['id'] = i
            i=i+1

        sqlFormula1 = "INSERT INTO persons (id, calculatedEduLevel, firstName, middleName, lastNamePrefix, lastName) VALUES (%s, %s, %s, %s, %s, %s)"
        sqlFormula2 = "INSERT INTO r_person_institution (person_id, institution_id) VALUES (%s, %s)"
        sqlFormula3 = "INSERT INTO r_patent_person (person_id, patent_id) VALUES (%s, %s)"

        for personss in persons:
            for key, person in personss.items():

                person_data = (person['id'], person['calculatedEduLevel'], person['firstName'], person['middleName'], person['lastNamePrefix'], person['lastName'])
                self.mycursor.execute(sqlFormula1, person_data)

                for institution_id in person['institutions']:
                    self.mycursor.execute(sqlFormula2, (person['id'], institution_id))
                for patent_id in person['patents']:
                    self.mycursor.execute(sqlFormula3, (person['id'], patent_id))

        
        self.mydb.commit()
        print("zapisano w BD osoby")
    #mycorsor.execute("SHOW TABLES", )

    #for db in mycorsor:
     #   print(db)
