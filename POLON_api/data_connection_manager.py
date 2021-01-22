from itertools import product
from fuzzywuzzy import fuzz
import hashlib
from tqdm import *
from Downloading_Manager import Downloading_Manager

class GetOutOfLoop( Exception ):
    pass

def to_str(s):
    if s is None:
        return ' '
    return str(s).lower()


# Łączenie danych z dwóch zbiorów.
def patents_person_connection(patents, persons, persons_hash_list):
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

                                person['patents'].append(patent['protectionUuid'])
                                inventor['id'] = person['id']
                                finded = True
                                break

                # Jeżeli nie znaleziono osoby w bazie, to tworzona jest nowa pozycją ją reprezentująca
                if finded == False:   
                    new_persons = new_persons + 1
                    hash_key = hashlib.sha1(str.encode(str(patent['applicants'][0]['institutionUuid']).join([to_str(s) for s in key]))).hexdigest() 
                    #print('brak osoby w bazie')
                    new_person = {
                        'id': hash_key,
                        'calculatedEduLevel': None,
                        'patents': [patent['protectionUuid']],
                        'author_id': None,
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
                    inventor['id'] = new_person['id']

                    if key not in persons:
                        persons[key] = []
                    persons[key].append(new_person)
                    persons_hash_list[new_person['id']] = new_person

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


def get_similarity(person, author_name):

    n = len(author_name.split())
    Str1 = to_str(person['first_name'])
    Str2 = author_name

    if n > 1:
        Str1 = Str1 + ' ' + to_str(person['middle_name'])
    if n > 2:
        Str1 = Str1 + ' ' + to_str(person['last_name_prefix'])

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



def get_connected_persons(person, patents):
    container = {}

    for patent_id in person['patents']:
        patent = patents[patent_id][0]
        for sub_worker in patent['inventors']:
            container[sub_worker['id']] = 1
    return(container)



def old_publications_person_connection(patents, persons, persons_hash_list, downloading_manager):

    print("Łączenie autorów patentów z autorami publikacji")
    with tqdm(total=len(persons_hash_list)) as pbar:
        for k, v in persons.items():
            for person in v:
                pbar.update(1)
                potential_publications = []
                connected_persons = get_connected_persons(person, patents)

                if len(connected_persons) == 0:
                    continue

                pd = person['personalData']

                publications = downloading_manager.get_publications(lastName=pd['lastName'])
                w=3
                # po wszystkich publikacjach z danym nazwiskiem sprawdzamy, czy imiona twórców sobie odpowiadają
                for k, v in publications.items():
                    publication = v[0]
                    for author in publication['authors']:
                        if author['lastName'] == pd['lastName'] and (get_similarity(pd, to_str(author['name'])) == 100):
                            potential_publications.append([publication, 0, author['objectId']])
                            break
            
                if len(potential_publications) == 0:
                    continue
                try:
                    for publication_rank in potential_publications:
                        publication = publication_rank[0]
                        connection_power = publication_rank[1]
                        for pub_author, pat_author_key in product(publication['authors'], connected_persons): 
                            pat_author = persons_hash_list[pat_author_key]
                            con_pd = pat_author['personalData']
                            if connection_power > 10:
                                raise GetOutOfLoop

                            if pub_author['objectId'] == pat_author['author_id']:
                                connection_power += 3
                            elif pub_author['lastName'] == con_pd['lastName'] and (get_similarity(con_pd, to_str(pub_author['name'])) == 90):
                                connection_power += 1
                except GetOutOfLoop:
                    pass
                res = max(potential_publications, key = lambda i : i[1])
                if res[1] > 0:               
                    person['author_id'] = res[2]
    return()

def persons_authors_connection(database):

    
    persons = database.get_persons()

    print("Łączenie autorów patentów z autorami publikacji")
    for limes in range(15, 2, -1):
        print("przebieg dla ograniczenia powiązania: ", limes)
        actualized_persons = {}
        with tqdm(total=len(persons)) as pbar:
            for person in persons:

                pbar.update(1)

                connected_persons = database.get_sub_authors_patents(person['id'])

                if len(connected_persons) == 0:
                    continue

                potential_authors = []

                authors = database.get_authors_by_lastName(person['last_name'])
                for author in authors:
                    if (get_similarity(person, to_str(author['name'])) == 100):
                        potential_authors.append([author, 0])
            
                if len(potential_authors) == 0:
                    continue

                for potential_author in potential_authors:
                    author = potential_author[0]
                    connected_authors = database.get_sub_authors_publications(author['id'])

                    for sub_person, sub_author in product(connected_persons, connected_authors): 
                        if potential_author[1] > limes*5:
                            break
                        if sub_person['publication_author_id'] == sub_author['id']:
                            potential_author[1] += 3
                        if to_str(sub_person['last_name']) == to_str(sub_author['last_name']) and (get_similarity(sub_person, to_str(sub_author['name'])) == 100):
                            potential_author[1] += 1

                res = max(potential_authors, key = lambda i : i[1])
                if res[1] > limes:
                    if((person['connection_power'] is None) or (person['connection_power'] < res[1])):
                        person['publication_author_id'] = res[0]['id']
                        person['connection_power'] = res[1]
                        actualized_persons[person['id']] = {"id": person['id'], "author_id": person['publication_author_id'], "connection_power": person['connection_power']}

        print("powiązano %s osób " % len(actualized_persons))
        database.update_persons(actualized_persons)


def extract_institutions(patents, persons):
    institutions = {}
    r_patent_institution = []
    r_person_institution = []

    for k, v in patents.items():
        patent = v[0]
        for institution in patent['applicants']:

            institutions[institution['institutionUuid']] = {
                'institutionUuid': institution['institutionUuid'],
                'institutionName': institution['institutionName']
                }

            r_patent_institution.append({
                'id': len(r_patent_institution), 
                'patent_id': patent['protectionUuid'],
                'institution_id': institution['institutionUuid']
                })

    for k, v in persons.items():
        for person in v:
            for institution in person['employments']:

                institutions[institution['employingInstitutionUuid']] = {
                    'institutionUuid': institution['employingInstitutionUuid'],
                    'institutionName': institution['employingInstitutionName']
                    }

                r_person_institution.append({
                    'id': len(r_person_institution), 
                    'person_id': person['id'],
                    'institution_id': institution['employingInstitutionUuid']
                    })

    return institutions, r_patent_institution, r_person_institution 