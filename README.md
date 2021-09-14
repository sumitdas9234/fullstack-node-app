# Setting Up MongoDB locally & Inserting Documents
## Getting Started
> As a prerequisite, please install python >=3.5 and Docker Desktop

If you're following along the tutorials, after running `git checkout mongodb`, you should have the following project structure.
```bash
fullstack-node-app
├── LICENSE
├── README.md
├── json
│   ├── parents.json
│   ├── students.json
│   └── teachers.json
├── mongodb
│   └── setup.py
└── scrapping
    ├── create_json.py
    ├── csv
    │   ├── parents.csv
    │   ├── students.csv
    │   └── teachers.csv
    └── data
        ├── parents.csv
        ├── students.csv
        └── teachers.csv
```

## Run the Python Script
Run the following command to get the `MongoDB Client` for Python
``` bash
pip install pymongo --user
```

Now, we can run the script to set up the local MongoDB via Docker
``` bash
python mongodb/set_up.py ./json
```

## Next Steps
Now that we have the MongoDB ready, we will move on and build a CRUD based backend in nodejs.

>Checkout the `backend` branch and follow along the **README** in that branch.

```bash
git checkout backend
```
