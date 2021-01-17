import mysql.connector
import datetime    
from tqdm import *


class Database:
    def __init__(self):
        self.mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="",
            database="tass" # bez tego jesteśmy o stopień wyżej
        )

        self.mycursor = self.mydb.cursor()
    

    def add_patents(self, patents):
        sqlFormula = "INSERT INTO patent (id, title, type, date) VALUES (%s, %s, %s, %s)"
        
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
        sqlFormula = "INSERT INTO patent_author (id, calculated_edu_level, first_name, middle_name, last_name_prefix, last_name, publication_author_id ) VALUES (%s, %s, %s, %s, %s, %s, %s)"

        for k, v in persons.items():
            for person in v:
                pd = person['personalData']
                person_data = (
                    person['id'],
                    person['calculatedEduLevel'], 
                    pd['firstName'],
                    pd['middleName'],
                    pd['lastNamePrefix'],
                    pd['lastName'],
                    person['author_id']
                    )
                try:
                    self.mycursor.execute(sqlFormula, person_data)
                except mysql.connector.Error as err:
                    print("Problem ze wstawieniem do bazy: {}".format(err))
      
        self.mydb.commit()
        print("zapisano w BD osoby")


    def add_r_patent_person(self, r_Person_Patent):
        sqlFormula = "INSERT INTO patent_authors (patents_id, persons_id) VALUES (%s, %s)"

        for position in r_Person_Patent:
            r = (
                position['patent_id'],
                position['person_id'],
                )
            try:
                self.mycursor.execute(sqlFormula, r)
            except mysql.connector.Error as err:
                print("Problem ze wstawieniem do bazy: {}".format(err))
      
        self.mydb.commit()
        print("zapisano w BD r_Person_Patent")


    def add_institutions(self, institutions):
        sqlFormula = "INSERT INTO institution (id, title) VALUES (%s, %s)"

        for k, position in institutions.items():
            r = (
                position['institutionUuid'],
                position['institutionName']
                )
            try:
                self.mycursor.execute(sqlFormula, r)
            except mysql.connector.Error as err:
                print("Problem ze wstawieniem do bazy: {}".format(err))
            
      
        self.mydb.commit()
        print("zapisano w BD institutions")

    def add_r_patent_institution(self, r_patent_institution):
        sqlFormula = "INSERT INTO patent_institutions (patents_id, institutions_id) VALUES (%s, %s)"

        for position in r_patent_institution:
            r = (
                position['patent_id'],
                position['institution_id']
                )
            try:
                self.mycursor.execute(sqlFormula, r)
            except mysql.connector.Error as err:
                print("Problem ze wstawieniem do bazy: {}".format(err))
      
        self.mydb.commit()
        print("zapisano w BD patent_institutions")


    def add_r_person_institution(self, r_person_institution):
        sqlFormula = "INSERT INTO patent_author_institutions (patent_authors_id , institutions_id) VALUES (%s, %s)"

        for position in r_person_institution:
            r = (
                position['person_id'],
                position['institution_id']
                )
            try:
                self.mycursor.execute(sqlFormula, r)
            except mysql.connector.Error as err:
                print("Problem ze wstawieniem do bazy: {}".format(err))
      
        self.mydb.commit()
        print("zapisano w BD r_person_institution")


    def add_publications(self, publications):
        sqlFormula = "INSERT INTO publication (id, title, type, year) VALUES (%s, %s, %s, %s)"
        
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

        sqlFormula = "INSERT INTO publication_author (id, name, last_name) VALUES (%s, %s, %s)"

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

        sqlFormula = "INSERT INTO publication_authors (publication_id, author_id) VALUES (%s, %s)"

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

