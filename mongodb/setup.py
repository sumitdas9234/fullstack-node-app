#!/usr/bin/python3
import subprocess, sys, os, json
from pymongo import MongoClient 

########################################################
#                Variables & Inputs
#
########################################################
path_to_json = sys.argv[1]
db_name = "school"


########################################################
#                   Helper Functions
#
########################################################
def file_exists(filepath):
    if os.path.isfile(os.path.join(path_to_json, filepath)):
        print(f"  ✔ Found file: \t\t[ {filepath} ]")
        return True
    else:
        print(f"  ✖ Not Found: \t\t\t[ {filepath} ]")
        return False


def insert_file_to_mongo(client, database, collection, filename):
    db = client[database]
    col = db[collection]
    ids = None
    with open(filename) as file:
        file_data = json.load(file)
    if isinstance(file_data, list):
        ids = col.insert_many(file_data)  
    else:
        ids = col.insert_one(file_data)
    if ids.inserted_ids: 
        print(f"  ✔ Bulk Insert:\t\t[ {filename} ]")
    else:
        print(f"  ✖ Bulk Insert:\t\t[ {filename} ]")


def get_collections_details(client, database, collection):
    db = client[database]
    col = db[collection]
    count = col.count_documents({})
    print(f"  ✔ Documents in {collection}:\t\t[ {count} ]")  



def main(): 
    print("—————————————————— Setting Up ——————————————————")
    print("● Checking Requirements: ")

########################################################
#                   Check Requirements
#
########################################################
    python_version = sys.version_info
    if python_version >= (3,5):
        print(f"  ✔ Python: \t\t\t{python_version.major}.{python_version.minor}.{python_version.micro}")
    else:
        sys.exit("Use Python>=3.5 to execute the script")

    docker_server = subprocess.run(['docker', 'version', '--format' , '{{.Server.Version}}'], capture_output=True)
    if docker_server.returncode:
        sys.exit("Cannot Find Docker Server.")
    else:
        docker_server_version = f"Docker Server Version: \t{docker_server.stdout.decode('utf-8').strip()}"
        print(f"  ✔ {docker_server_version}")

    docker_client = subprocess.run(['docker', 'version', '--format' , '{{.Client.Version}}'], capture_output=True)
    if docker_client.returncode:
        sys.exit("Cannot Find Docker Client")
    else:
        docker_client_version = f"Docker Client Version: \t{docker_client.stdout.decode('utf-8').strip()}"
        print(f"  ✔ {docker_client_version}")


########################################################
#                   Validate JSON Files
#
########################################################
    print(f"● Validating JSON files:")
    if file_exists('parents.json') and file_exists('students.json') and file_exists('teachers.json'):
        pass
    else: 
        sys.exit("File/Files not found.")


########################################################
#             Setup & Run MongoDB Docker Image
#
########################################################
    print(f"● Setting Up Local MongoDB:")
    pulled_image = subprocess.run(['docker', 'pull', 'mongo:4.2.16-rc0'], capture_output=True)
    if pulled_image.returncode:
        sys.exit("Cannot Pull Docker Image.")
    else:
        image_details = [line.split()[-1] for line in pulled_image.stdout.decode('utf-8').strip().splitlines() if "Status" in line][0]
        print(f"  ✔ Pulled Docker Image:\t[ {image_details} ]")

    run_image = subprocess.run(['docker', 'run', '--name', 'local-mongodb', '-d', '-p', '27017:27017', 'mongo:4.2.16-rc0'], capture_output=True)
    if run_image.returncode:
        sys.exit("Cannot Run Docker Container.")
    else:
        print(f"  ✔ Running Docker Container:	[ local-mongodb ]")


########################################################
#             Connect to MongoDB, Insert
#                & Validate Documents
########################################################
    client = MongoClient("mongodb://localhost:27017/") 
    if client != None:
        details = client.server_info()
        print(f"  ✔ MongoDB Version:\t\t[ {details['version']} ]")


    print(f"● Bulk Insert Data to MongoDB:")
    insert_file_to_mongo(client, db_name, 'students', os.path.join(path_to_json, 'students.json'))
    insert_file_to_mongo(client, db_name, 'parents', os.path.join(path_to_json, 'parents.json'))
    insert_file_to_mongo(client, db_name, 'teachers', os.path.join(path_to_json, 'teachers.json'))


    print(f"● Validate Collection Counts:")
    get_collections_details(client, db_name, 'students')
    get_collections_details(client, db_name, 'parents')
    get_collections_details(client, db_name, 'teachers')

    print("—————————————————— Success ——————————————————")


if __name__ == '__main__':
    main()