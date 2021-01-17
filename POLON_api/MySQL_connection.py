import mysql.connector
import datetime    
from tqdm import *


class Database:
    def __init__(self):
        self.mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="",
            database="polon" # bez tego jesteśmy o stopień wyżej
        )

        self.mycursor = self.mydb.cursor()
    
    def get_table_statement(self):
        sqlFormula = "SHOW CREATE TABLE authors"
        self.mycursor.execute(sqlFormula)

        myresult = self.mycursor.fetchall()

        f = open("MySQL_script.txt", "a")
        f.write(str(myresult))
        f.close()


    def add_patents(self, patents):


        sqlFormula = "INSERT INTO patents (id, title, type, date) VALUES (%s, %s, %s, %s)"
        
        for k, v in patents.items():         
            patent = v[0]
            patent_data = (
                patent['protectionUuid'],
                patent['productTitles'][0]['value'], 
                patent['productType'], 
                patent['publicationDate']
                )
            try:
                self.mycursor.execute(sqlFormula, patent_data)
            except mysql.connector.Error as err:
                print("Problem ze wstawieniem do bazy: {}".format(err))
            

        self.mydb.commit()
        print("zapisano w BD patenty")


    def add_persons(self, persons):

        sqlFormula = "INSERT INTO persons (id, calculatedEduLevel, firstName, middleName, lastNamePrefix, lastName) VALUES (%s, %s, %s, %s, %s, %s)"

        for k, v in persons.items():
            for person in v:
                pd = person['personalData']
                person_data = (
                    person['id'],
                    person['calculatedEduLevel'], 
                    pd['firstName'],
                    pd['middleName'],
                    pd['lastNamePrefix'],
                    pd['lastName']
                    )
                try:
                    self.mycursor.execute(sqlFormula, person_data)
                except mysql.connector.Error as err:
                    print("Problem ze wstawieniem do bazy: {}".format(err))
      
        self.mydb.commit()
        print("zapisano w BD osoby")


    def add_r_patent_person(self, r_Person_Patent):

        sqlFormula = "INSERT INTO r_patent_person (patent_id, person_id) VALUES (%s, %s)"

        for position in r_Person_Patent:
            r = (
                position['patent_id'],
                position['person_id'],
                )
            self.mycursor.execute(sqlFormula, r)
      
        self.mydb.commit()
        print("zapisano w BD r_Person_Patent")



    def add_publications(self, publications):


        sqlFormula = "INSERT INTO publications (id, title, type, year) VALUES (%s, %s, %s, %s)"
        sqlFormula2 = "INSERT INTO authors (id, name, lastName) VALUES (%s, %s, %s)"
        sqlFormula3 = "INSERT INTO r_publication_author (publication_id, author_id) VALUES (%s, %s)"
        
        print("Zapisywanie publikacji w BD")
        with tqdm(total=len(publications)) as pbar:
            for k, v in publications.items():    
                pbar.update(1)
                publication = v[0]
                data = (
                    publication['objectId'],
                    publication['title'], 
                    publication['type'], 
                    publication['year']
                    )
                try:
                    self.mycursor.execute(sqlFormula, data)
                except mysql.connector.Error as err:
                    pass
                    #print("Problem ze wstawieniem do bazy: {}".format(err))
            

        self.mydb.commit()
        print("zapisano w BD publikacje")


    def add_authors(self, authors):

        sqlFormula = "INSERT INTO authors (id, name, lastName) VALUES (%s, %s, %s)"

        print("Zapisywanie autorów publikacji w BD")
        with tqdm(total=len(authors)) as pbar:
            for k, v in authors.items():
                pbar.update(1)
                for author in v:
                    data = (
                        author['objectId'],
                        author['name'],
                        author['lastName']
                        )
                    try:
                        self.mycursor.execute(sqlFormula, data)
                    except mysql.connector.Error as err:
                        pass
                        #print("Problem ze wstawieniem do bazy: {}".format(err))
      
        self.mydb.commit()
        print("zapisano w BD osoby")


    def add_r_publication_author(self, r_Publication_Author):

        sqlFormula = "INSERT INTO r_publication_author (publication_id, author_id) VALUES (%s, %s)"

        print("Zapisywanie relacji autorów z publikacjami w BD")
        with tqdm(total=len(r_Publication_Author)) as pbar:
            for position in r_Publication_Author:
                pbar.update(1)
                r = (
                    position['publication_id'],
                    position['author_id'],
                    )

                try:
                    self.mycursor.execute(sqlFormula, r)
                except mysql.connector.Error as err:
                    pass

                    #print("Problem ze wstawieniem do bazy: {}".format(err))
                
      
            self.mydb.commit()
        print("zapisano w BD r_Publication_Author")