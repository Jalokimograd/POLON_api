import requests
import json
import pandas as pd
from MySQL_connection import Database 

class Patents:
    def __init__(self):
        self.Patents = {}

        self.url = 'https://radon.nauka.gov.pl/opendata/polon/products'
        self.actualSession = requests.Session()


    def get_patents(self, publicationDateFrom = '2019-01-01', publicationDateTo = '2020-12-31', inventorFirstName = '', inventorLastName = '', token = ''):
        parameters = {
        'resultNumbers': 100,
        'publicationDateFrom': publicationDateFrom,
        'publicationDateTo': publicationDateTo,
        'inventorFirstName': inventorFirstName,
        'inventorLastName': inventorLastName,
        'token': token
        }
        response = self.actualSession.get(self.url, params=parameters)
        connor = response.json()

        return(connor)


    def save_patents(self):
        my_token = ''
        while True:
            connor = self.get_patents(token = my_token)
            my_token = connor['pagination']['token']
            if my_token is None:
                break

            for result in connor['results']:
                id = result['protectionUuid']
                date = result['publicationDate']
                title = result['productTitles'][0]['value']
                type = result['protectionType']
                institutions = [institution for institution in result['applicants'] or []]
                inventors = [inventor for inventor in result['inventors'] or []]

                self.Patents[id] = {"date":date, "title":title, "type":type, "inventors":inventors, "institutions":institutions}




    #database = Database()
    #for patent in Patents:
    #    database.add_patent(patent)

