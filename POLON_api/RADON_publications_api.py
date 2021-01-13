import requests
import io
import json
import pandas as pd

Publications = []
url = 'https://radon.nauka.gov.pl/opendata/polon/publications'
parameters = {
    'resultNumbers': 100,
    'firstName': '',
    'lastName': '',
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
        title = result['title']
        type = result['type']
        year = result['year']
        mainLanguage = result['mainLanguage']
        institutions = [institution['name'] for institution in result['affiliations'] or []]
        authors = [{
                        'firstName': inventor['name'],
                        'lastName': inventor['lastName'],
                        'objectId': inventor['objectId'] 
                      } for inventor in result['authors'] or []]

        Publications.append({"type":type, "title":title, "year":year, "authors":authors, "institutions":institutions})




    with io.open("saved_publications.txt", "w+", encoding="utf-8") as filehandle:
        for listitem in Publications:
            filehandle.write('%s\n' % listitem)

