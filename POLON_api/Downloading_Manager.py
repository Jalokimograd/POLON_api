import requests
import json
import pandas as pd
from tqdm import *


class Downloading_Manager:
    def __init__(self):

        self.actualSession = requests.Session()

    def person_hash(self, persons_by_name):
        container = {}

        for k, v in persons_by_name.items():
            for person in v:
                person['patents'] = []
                person['author_id'] = ''
                container[person['id']] = person
        return(container)
#===============================================================================================
    def download_data(self, url, parameters, _get_id):
        container = {}  
        connor = self.actualSession.get(url, params=parameters).json()
        
        with tqdm(total=connor['pagination']['maxCount']) as pbar:
            while True:    
                parameters['token'] = connor['pagination']['token']

                # brak danych na stronie
                if parameters['token'] is None:    
                    break

                for result in connor['results']:
                    id = _get_id(result)
                    if id not in container:
                        container[id] = []
                    container[id].append(result)
                
                pbar.update(parameters['resultNumbers'])
                response = self.actualSession.get(url, params=parameters)
                connor = response.json()


        return(container)


    def download_short_data(self, url, parameters, _get_id):
        container = {}  
        connor = self.actualSession.get(url, params=parameters).json()
        
        while True:    
            parameters['token'] = connor['pagination']['token']

            # brak danych na stronie
            if parameters['token'] is None:    
                break

            for result in connor['results']:
                id = _get_id(result)
                if id not in container:
                    container[id] = []
                container[id].append(result)
                
            response = self.actualSession.get(url, params=parameters)
            try:
                connor = response.json()
            except:
                print("problem z pobieraniem")


        return(container)
#===============================================================================================                


    def get_patents(self):
        url = 'https://radon.nauka.gov.pl/opendata/polon/products'
        _patent_id = lambda x : x['protectionUuid']
        parameters = {
            'resultNumbers': 100,
            'publicationDateFrom': '2016-01-01',
            'publicationDateTo': '2021-12-31',
            'inventorFirstName': '',
            'inventorLastName': '',
            'productType': 'Wynalazek',
            'token': ''
            }
        
        print("Pobieranie Patentów")
        return(self.download_data(url, parameters, _patent_id))

    def get_publications(self, lastName=''):
        url = 'https://radon.nauka.gov.pl/opendata/polon/publications'  
        _publication_id = lambda x : x['objectId']
        parameters = {
            'resultNumbers': 100,
            'yearFrom': '2019',
            'yearTo': '',
            'firstName': '',
            'lastName': lastName,
            'token': ''
            }
        
        #print("Pobieranie Publikacji")
        if lastName == '':
            return(self.download_data(url, parameters, _publication_id))
        return(self.download_short_data(url, parameters, _publication_id))
                

    def get_persons(self):
        url = 'https://radon.nauka.gov.pl/opendata/polon/employees'
        _person_id = lambda x : tuple([v.lower() for k, v in x['personalData'].items() if v != None])
        parameters = {
            'resultNumbers': 100,
            'firstName': '',
            'lastName': '',
            'token': ''
            }
        
        print("Pobieranie Osób")
        persons_by_name = self.download_data(url, parameters, _person_id)
        persons_by_hash = self.person_hash(persons_by_name)
        return(persons_by_name, persons_by_hash)


