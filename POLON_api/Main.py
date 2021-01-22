import mysql.connector   
import io
from data_connection_manager import *
from MySQL_connection import Database 


downloading_manager = Downloading_Manager()
database = Database()


persons_authors_connection(database)

i = 0

if i == 1:
    PATENTS = downloading_manager.get_patents()
    P_name, P_hash = downloading_manager.get_persons()
    institutions, r_patent_institution, r_person_institution = extract_institutions(PATENTS, P_name)

    r_Person_Patent = patents_person_connection(PATENTS, P_name, P_hash)
    publications_person_connection(PATENTS, P_name, P_hash, downloading_manager)

    database.add_institutions(institutions)
    database.add_patents(PATENTS)
    database.add_persons(P_name)
    database.add_r_patent_person(r_Person_Patent)
    database.add_r_patent_institution(r_patent_institution)
    database.add_r_person_institution(r_person_institution)

    PUBLICATIONS = downloading_manager.get_publications()
    AUTHORS = get_authors_from_publications(PUBLICATIONS)
    r_Publication_Author = publications_authors_connection(PUBLICATIONS, AUTHORS)

    database.add_publications(PUBLICATIONS)
    database.add_authors(AUTHORS)
    database.add_r_publication_author(r_Publication_Author)


print('koniec')