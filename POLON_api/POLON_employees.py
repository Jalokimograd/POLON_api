import requests
import io
import json
import pandas as pd
import hashlib
from itertools import product
from MySQL_connection import Database 

#   wykaz patentów jak i osób pochodzą z tego samego serwisu więc zakładam osgórnie że dane są spójne
#   więc jeżeli udało nam się przy patencie uzyskać firstName i lastName, to poszukując kogoś w zbiorze
#   'employees' również takie informacje powinny występować. 

class Persons:
    def __init__(self):
        self.unrecognized_persons = {}      #   osoby nie znalezione w bazie POLONa. Ich instancje tworzymy sami
        self.recognized_persons = {}        #   osoby znalezione w bazie POLONa i identyfikowane za pomocą POLONowego id
        self.Institutions = {}

        self.url = 'https://radon.nauka.gov.pl/opendata/polon/employees'
        self.actualSession = requests.Session()


    def save_persons(self, PATENTS):        
        for key, patent in PATENTS.Patents.items():                     #   dla każdego patentu
            for inventor in patent['inventors']:                        #   dla inventora w patencie wykonaj zapytanie do bazy
                matching_persons = []
                parameters = {
                    'resultNumbers': 100,
                    'firstName': inventor['firstName'],
                    'lastName': inventor['lastName'],
                    'token': ''
                    }
                while True:                                             #   dla każdej strony zapytania
                    response = self.actualSession.get(self.url, params=parameters)
                    connor = response.json()
                    parameters['token'] = connor['pagination']['token']
                    if parameters['token'] is None:
                        break
                    for result in connor['results']:                    #   dla każdej pozycji odpowiedzi
                        if (inventor['middleName'] == result['personalData']['middleName'] and
                            inventor['lastNamePrefix'] == result['personalData']['lastNamePrefix']):
                
                            for patent_institute, person_institute in product(patent['institutions'], result['employments']): 
                                if patent_institute['institutionUuid'] == person_institute['employingInstitutionUuid']:
                                    matching_persons.append(self.recognized_person_data(result))
                                    break


            print(len(self.unrecognized_persons) + len(self.recognized_persons))
            if len(matching_persons) > 1: 
                print("Niewystarczające informacje dla", inventor)
            elif len(matching_persons) == 0:
                tuple_key = (inventor['firstName'], inventor['middleName'], inventor['lastNamePrefix'], inventor['lastName'])
                if tuple_key not in self.unrecognized_persons:
                    inventor['patents'] = {}
                    inventor['institutions'] = {}
                    inventor['calculatedEduLevel'] = ''
                    self.unrecognized_persons[tuple_key] = inventor
                    
                self.unrecognized_persons[tuple_key]['patents'][key] = 1
                for institute in patent['institutions']:
                    self.unrecognized_persons[tuple_key]['institutions'][institute['institutionUuid']] = 1
                    self.Institutions[institute['institutionUuid']] = institute['institutionName']

            else:
                if matching_persons[0]['id'] not in self.recognized_persons:
                    self.recognized_persons[matching_persons[0]['id']] = matching_persons[0]

                self.recognized_persons[matching_persons[0]['id']]['patents'][key] = 1

            


    def unrecognized_person_data(self, patent_inventor):
        my_token = ''
        patent_inventor['patent'] = []
        while True:
            response = PATENTS.get_patents(inventorFirstName = patent_inventor['firstName'], inventorLastName = patent_inventor['lastName'], token = my_token)
            connor = response['json']
            my_token = response['token']
            if my_token is None:
                break

            for result in connor['results']:
                for inventor in result['inventors']:
                    if(inventor['firstName'] == patent_inventor['firstName'] and
                       inventor['middleName'] == patent_inventor['middleName'] and
                       inventor['lastNamePrefix'] == patent_inventor['lastNamePrefix'] and
                       inventor['lastName'] == patent_inventor['lastName']):
                        patent_inventor['patent'].append({
                            'id':result['protectionUuid'], 
                            'institutions':[{
                                'institutionName': institution['institutionName'], 
                                'institutionUuid': institution['institutionUuid']
                                } for institution in result['applicants'] or []] })
                        break
        return(patent_inventor)

    def recognized_person_data(self, result):
        id =                 result['id']
        calculatedEduLevel = result['calculatedEduLevel']   #stopień naukowy
        firstName =          result['personalData']['firstName']
        middleName =         result['personalData']['middleName']
        lastNamePrefix =     result['personalData']['lastNamePrefix']
        lastName =           result['personalData']['lastName']   
        #disciplines = [institution['firstDisciplineName'] for institution in result['employments'] or []]
        institutions = {institution['employingInstitutionUuid']:1 for institution in result['employments'] or []}
        for institution in result['employments']:
            self.Institutions[institution['employingInstitutionUuid']] = institution['employingInstitutionName']


        return({
            "id":id, 
            "calculatedEduLevel":calculatedEduLevel, 
            "firstName":firstName,
            "middleName":middleName,
            "lastNamePrefix":lastNamePrefix,
            "lastName":lastName,
            "institutions":institutions,
            "patents": {}
            })