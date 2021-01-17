from itertools import product
from fuzzywuzzy import fuzz
import hashlib
from tqdm import *

def to_str(s):
    if s is None:
        return ' '
    return str(s).lower()


# Łączenie danych z dwóch zbiorów.
def patents_person_connection(patents, persons):
    container = []

    new_persons = 0

    with tqdm(total=len(patents)) as pbar:
        for k, v in patents.items():
            pbar.update(1)
            patent = v[0]
            if patent['inventors'] is None:
                continue
            for inventor in patent['inventors']:
                finded = False  # czy powiązano osobę z patantu z osobą z BD
                key = (to_str(inventor['firstName']), to_str(inventor['middleName']), to_str(inventor['lastName']), to_str(inventor['lastNamePrefix']))

                if key in persons:
                    for person in persons[key]:
                        for employment, institution in product(person['employments'], patent['applicants']): 
                            if institution['institutionUuid'] == employment['employingInstitutionUuid']:
                                container.append({
                                    'id': len(container), 
                                    'person_id': person['id'],
                                    'patent_id': patent['protectionUuid']
                                    })
                                finded = True
                                break

                # Jeżeli nie znaleziono osoby w bazie, to tworzona jest nowa pozycją ją reprezentująca
                if finded == False:   
                    new_persons = new_persons + 1
                    hash_key = hashlib.sha1(str.encode(str(patent['applicants'][0]['institutionUuid']).join([to_str(s) for s in key]))).hexdigest() 
                    #print('brak osoby w bazie')
                    new_person = {
                        'id': hash_key,
                        'calculatedEduLevel': '',
                        'personalData': {
                            'firstName': inventor['firstName'],
                            'middleName': inventor['middleName'],
                            'lastName': inventor['lastName'],
                            'lastNamePrefix': inventor['lastNamePrefix']},
                        'employments': [{
                            'employingInstitutionUuid': institution['institutionUuid'], 
                            'employingInstitutionName': institution['institutionName']
                            } for institution in patent['applicants']]
                        }

                    if key not in persons:
                        persons[key] = []
                    persons[key].append(new_person)

                    container.append({
                                'id': len(container), 
                                'person_id': new_person['id'],
                                'patent_id': patent['protectionUuid']
                                })


    print(new_persons)
    return(container)

# Zapisywanie autorów w hashu przyspieszającym dobieranie się do nich po nazwisku
def get_authors_from_publications(publications):
    container = {}

    print("Przetwarzanie autorów publikacji")
    with tqdm(total=len(publications)) as pbar:
        for k, v in publications.items():
            pbar.update(1)
            publication = v[0]

            for author in publication['authors']:
                finded = False
                key = to_str(author['lastName'])

                if key not in container:
                    container[key] = []
                else:
                    for other in container[key]:
                        if other['objectId'] == author['objectId']:
                            finded = True
                            other['publications'].append(publication['objectId'])
                            break
            
                if finded == False:
                    author['publications'] = []
                    author['publications'].append(publication['objectId'])
                    container[key].append(author)


    return(container)


def get_similarity(person_data, author_name):

    n = len(author_name.split())
    Str1 = to_str(person_data['firstName'])
    Str2 = author_name

    if n > 1:
        Str1 = Str1 + ' ' + to_str(person_data['middleName'])
    if n > 2:
        Str1 = Str1 + ' ' + to_str(person_data['lastNamePrefix'])

    Ratio = fuzz.ratio(Str1.lower(),Str2.lower())
    Partial_Ratio = fuzz.partial_ratio(Str1.lower(),Str2.lower())
    Token_Sort_Ratio = fuzz.token_sort_ratio(Str1,Str2)
    Token_Set_Ratio = fuzz.token_set_ratio(Str1,Str2)

    return(max(Ratio, Partial_Ratio, Token_Sort_Ratio, Token_Set_Ratio))

def publications_authors_connection(publications, authors):
    container = []

    for k, v in authors.items():
        for author in v:
            for publication_id in author['publications']:
                container.append({
                    'id': len(container), 
                    'publication_id': publication_id,
                    'author_id': author['objectId']
                    })
    return(container)

def publications_person_connection(publications, authors, persons):
    for k, v in persons.items():
        for person in v:
            pd = person['personalData']
            lastName = to_str(pd['lastName']).lower()

            if lastName not in authors:
                continue

            authors_with_lastname = authors[lastName]
            for author in authors_with_lastname:
                   
                name_p = to_str(pd['firstName']) + ' ' + to_str(pd['middleName']) + ' ' + to_str(pd['lastName']) + ' ' + to_str(pd['lastNamePrefix'])
                name_a = to_str(author['name']) + ' ' + to_str(author['lastName']) + ' ' + author['objectId']

                similarity = get_similarity(pd, to_str(author['name']))

                # Imiona są prawdopodobnie te same (Inicjał odpowiada imieniu itp.)
                if similarity == 100:

                    # Teraz trzeba sprawdzić, czy współpracownicy są podobni, lub dziedzina nauki
                    

                    print('===================================================================')
                    print('person: ', name_p)
                    print('author: ', name_a)
                    print('similarity: ', similarity)


def extract_institutions(persons):
    institutions = {}
    r_person_institution = []
    disciplines = {}

    for k, v in persons.items():
        for person in v:
            for institution in person['employments']:

                institutions[institution['employingInstitutionUuid']] = {
                    'employingInstitutionUuid': institution['employingInstitutionUuid'],
                    'employingInstitutionName': institution['employingInstitutionName']
                    }

                r_person_institution.append({
                    'id': len(container), 
                    'person_id': person['id'],
                    'institution_id': institution['employingInstitutionUuid']
                    })

                declared = institution['declaredDisciplines']

                disciplines[declared['firstDisciplineCode']] = {
                    'firstDisciplineCode': declared['firstDisciplineCode'],
                    'firstDisciplineName': declared['firstDisciplineName']
                    }
                disciplines[declared['secondDisciplineCode']] = {
                    'secondDisciplineCode': declared['secondDisciplineCode'],
                    'secondDisciplineName': declared['secondDisciplineName']
                    }

    return institutions, r_person_institution, 

