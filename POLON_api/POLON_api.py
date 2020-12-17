import requests
import io
import json
import pandas as pd

Patents = []
url = 'https://radon.nauka.gov.pl/opendata/polon/products'
parameters = {
    'resultNumbers': 100,
    'publicationDateFrom': '2012-01-01',
    'publicationDateTo': '2020-12-31',
    'token': ''
    }

actualSession = requests.Session()

while True:
    response = actualSession.get(url, params=parameters)
    connor = response.json()
    parameters['token'] = connor['pagination']['token']
    if parameters['token'] is None:
        break

    for result in connor['results']:
        date = result['publicationDate']
        title = result['productTitles'][0]['value']
        type = result['protectionType']
        institutes = [institution['institutionName'] for institution in result['applicants'] or []]
        inventors = [{
                        'firstName': inventor['firstName'],
                        'middleName': inventor['middleName'],
                        'lastNamePrefix': inventor['lastNamePrefix'],
                        'lastName': inventor['lastName']  
                      } for inventor in result['inventors'] or []]

        Patents.append({"date":date, "title":title, "type":type, "inventors":inventors, "institutes":institutes})




    with io.open("saved_patents.txt", "w+", encoding="utf-8") as filehandle:
        for listitem in Patents:
            filehandle.write('%s\n' % listitem)
