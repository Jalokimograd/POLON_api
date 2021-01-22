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
    

    def db_command(self, sqlFormula, inserting_data = None):

        try:
            if inserting_data == None:
                self.mycursor.execute(sqlFormula)
            else:
                self.mycursor.execute(sqlFormula, inserting_data)
        except mysql.connector.Error as err:
            print("Problem ze wstawieniem do bazy: {}".format(err))


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
            self.db_command(sqlFormula, patent_data)

        self.mydb.commit()
        print("zapisano w BD patenty")


    def add_persons(self, persons):
        sqlFormula = "INSERT INTO patent_author (id, calculated_edu_level, first_name, last_name, last_name_prefix, middle_name, publication_author_id ) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        for k, v in persons.items():
            for person in v:
                pd = person['personalData']
                person_data = (
                    person['id'],
                    person['calculatedEduLevel'], 
                    pd['firstName'],
                    pd['lastName'],
                    pd['lastNamePrefix'],
                    pd['middleName'],
                    person['author_id']
                    )
                self.db_command(sqlFormula, person_data)
      
        self.mydb.commit()
        print("zapisano w BD osoby")


    def add_r_patent_person(self, r_Person_Patent):
        sqlFormula = "INSERT INTO patent_authors (patents_id, authors_id) VALUES (%s, %s)"
        for position in r_Person_Patent:
            r = (
                position['patent_id'],
                position['person_id'],
                )
            self.db_command(sqlFormula, r)
      
        self.mydb.commit()
        print("zapisano w BD r_Person_Patent")


    def add_institutions(self, institutions):
        sqlFormula = "INSERT INTO institution (id, title) VALUES (%s, %s)"
        for k, position in institutions.items():
            r = (
                position['institutionUuid'],
                position['institutionName']
                )
            self.db_command(sqlFormula, r)
            
      
        self.mydb.commit()
        print("zapisano w BD institutions")

    def add_r_patent_institution(self, r_patent_institution):
        sqlFormula = "INSERT INTO patent_institutions (patents_id, institutions_id) VALUES (%s, %s)"
        for position in r_patent_institution:
            r = (
                position['patent_id'],
                position['institution_id']
                )
            self.db_command( sqlFormula, r)
      
        self.mydb.commit()
        print("zapisano w BD patent_institutions")


    def add_r_person_institution(self, r_person_institution):
        sqlFormula = "INSERT INTO patent_author_institutions (patent_authors_id , institutions_id) VALUES (%s, %s)"
        for position in r_person_institution:
            r = (
                position['person_id'],
                position['institution_id']
                )
            self.db_command(sqlFormula, r)
      
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
                    datetime.datetime(publication['year'], 1, 1).strftime('%Y-%m-%d')
                    )
                self.db_command(sqlFormula, data)        

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
                    self.db_command(sqlFormula, data)
      
        self.mydb.commit()
        print("zapisano w BD osoby")


    def add_r_publication_author(self, r_Publication_Author):
        sqlFormula = "INSERT INTO publication_authors (publications_id, authors_id) VALUES (%s, %s)"
        print("Zapisywanie relacji autorów z publikacjami w BD")
        with tqdm(total=len(r_Publication_Author)) as pbar:
            for position in r_Publication_Author:
                pbar.update(1)
                r = (
                    position['publication_id'],
                    position['author_id'],
                    )
                self.db_command(sqlFormula, r)
  
        self.mydb.commit()
        print("zapisano w BD r_Publication_Author")


    def get_authors_by_lastName(self, lastName):
        sqlFormula = """SELECT a.id, a.name
                        FROM `publication_author` as a
                        WHERE a.last_name = %s"""
        inserting_data = (lastName,)
        self.db_command(sqlFormula, inserting_data)

        columns = self.mycursor.description 
        result = [{columns[index][0]:column for index, column in enumerate(value)} for value in self.mycursor.fetchall()]

        return(result)


    def get_persons(self):
        sqlFormula = """SELECT a2.id, a2.first_name, a2.middle_name, a2.last_name_prefix, a2.last_name, a2.publication_author_id, a2.connection_power
                        FROM `patent_author` as a2"""

        self.db_command(sqlFormula = sqlFormula)
        
        columns = self.mycursor.description 
        result = [{columns[index][0]:column for index, column in enumerate(value)} for value in self.mycursor.fetchall()]

        return(result)


    def get_sub_authors_patents(self, id):
        sqlFormula = """SELECT a2.id, a2.first_name, a2.middle_name, a2.last_name_prefix, a2.last_name, a2.publication_author_id, a2.connection_power
                        FROM `patent_authors` as r_pa
                        INNER JOIN `patent_authors` as r_pa2 ON r_pa.patents_id = r_pa2.patents_id
                        INNER JOIN `patent_author`  as a2    ON a2.id = r_pa2.authors_id
                        WHERE r_pa.authors_id = %s """
        inserting_data = (id,)

        self.db_command(sqlFormula, inserting_data)
        
        columns = self.mycursor.description 
        result = [{columns[index][0]:column for index, column in enumerate(value)} for value in self.mycursor.fetchall()]

        return(result)


    def get_sub_authors_publications(self, id):
        #requirements = ''.join(["r_pa.authors_id = '%s' OR " % id for id in ids])[:-3]
        sqlFormula = """SELECT a2.id, a2.name, a2.last_name
                        FROM `publication_authors` as r_pa
                        INNER JOIN `publication_authors` as r_pa2 ON r_pa.publications_id = r_pa2.publications_id
                        INNER JOIN `publication_author`  as a2    ON a2.id = r_pa2.authors_id
                        WHERE r_pa.authors_id = %s """
        inserting_data = (id,)

        self.db_command(sqlFormula, inserting_data)
        #result = self.mycursor.fetchall()

        columns = self.mycursor.description 
        result = [{columns[index][0]:column for index, column in enumerate(value)} for value in self.mycursor.fetchall()]

        return(result)


    def update_persons(self, actualized_persons):
        for k, v in actualized_persons.items():
            actualized_person = v
            sqlFormula = """UPDATE `patent_author`
                            SET publication_author_id =  %s, connection_power = %s
                            WHERE id = %s"""
            data = (actualized_person['author_id'], actualized_person['connection_power'], actualized_person['id'])

            self.db_command(sqlFormula, data)     

        self.mydb.commit()


    def update_publication_date(self, publications):
        for k, v in publications.items():
            publication = v[0]

            sqlFormula = """UPDATE `publication` 
                            SET year = %s
                            WHERE id = %s"""


            id = publication['objectId']
            date = datetime.datetime(publication['year'], 1, 1).strftime('%Y-%m-%d')

            updating_data = (date, id)

            self.db_command(sqlFormula, updating_data)   

        self.mydb.commit()