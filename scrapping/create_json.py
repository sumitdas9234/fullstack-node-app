import csv, random, time, json, sys, os

########################################################
#                Variables & Inputs
#
########################################################
blood_groups = ['A', 'B', 'O', 'AB']
path_to_raw_files = sys.argv[1]


########################################################
#                   Helper Functions
#
########################################################
def str_time_prop(start, end, time_format, prop):
    stime = time.mktime(time.strptime(start, time_format))
    etime = time.mktime(time.strptime(end, time_format))
    ptime = stime + prop * (etime - stime)
    return time.strftime(time_format, time.localtime(ptime))


def random_date(start, end, prop):
    return str_time_prop(start, end, '%d-%m-%Y', prop)


def make_json(csvFilePath, jsonFilePath):
    json_list = []
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for row in csvReader:
            json_list.append(row)
        csvf.close()

    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(json_list))
        jsonf.close()


def read_csv_files(csv_file_path):
    data = []
    with open(csv_file_path, newline='') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            data.append(row)
        f.close()
    return data


def write_csv_files(file_name, headers, data):
    with open(file_name, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerows(data)



def main():
########################################################
#               Read Raw CSV Files
#
########################################################
    print(f"==========================================")
    print(f"*  Reading CSV Files from [ {path_to_raw_files} ]")
    students = read_csv_files(os.path.join(path_to_raw_files, 'students.csv'))
    parents = read_csv_files(os.path.join(path_to_raw_files, 'parents.csv'))
    teachers = read_csv_files(os.path.join(path_to_raw_files, 'teachers.csv'))


########################################################
#           Create/Modify Coulmns in the CSV
#           for Students, Parents and Teachers
########################################################
    print(f"*  Adding ID's, DOB & Blood Group")
    for idx, item in enumerate(random.sample(range(3000, 9099), 200)):
        parents[idx].append(f"R00{item}")
        students[idx].append(f"R00{item}")
        students[idx].append(random_date("1-1-2008", "1-1-2009", random.random()))
        students[idx].append(random.choice(blood_groups))
        students[idx][1] = parents[idx][1]
        students[idx][:2] = [' '.join(students[idx][:2])]
        parents[idx][:2] = [' '.join(parents[idx][:2])]

    for idx, item in enumerate(random.sample(range(2000, 2999), 10)):
        teachers[idx] = [f"T00{item}"] + teachers[idx] + [random.choice(blood_groups)]
        teachers[idx][1:3] = [' '.join(teachers[idx][1:3])]


########################################################
#                   Save to CSV Files
#
########################################################
    path_to_csv = os.path.join(os.getcwd(), 'scrapping', 'csv')
    print(f"*  Creating Directory [ {path_to_csv} ]")
    if not os.path.exists(path_to_csv):
        os.mkdir(path_to_csv)
    print(f"*  Writing CSV files to [ {path_to_csv} ]")
    write_csv_files(os.path.join(path_to_csv, 'students.csv'), ['name','gender','id','dob','bg'], students)
    write_csv_files(os.path.join(path_to_csv, 'teachers.csv'), ['id','name','gender','age','email','phone','bg'], teachers)
    write_csv_files(os.path.join(path_to_csv, 'parents.csv'), ['name','gender','email','phone','occupation','parentOf'], parents)


########################################################
#                   Create JSON Files
#
########################################################
    print(f"*  Creating Directory [ json ]")
    if not os.path.exists('json'):
        os.mkdir('json')
    print(f"*  Writing JSON files to [ json ]")
    make_json(os.path.join(path_to_csv, 'students.csv'), 'json/students.json')
    make_json(os.path.join(path_to_csv, 'parents.csv'), 'json/parents.json')
    make_json(os.path.join(path_to_csv, 'teachers.csv'), 'json/teachers.json')
    print(f"============== [ SUCCESS ] ===============")


if __name__ == '__main__':
    main()