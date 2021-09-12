# Scrapping & Parsing Data
## Getting Started
### Run the Python Script to create Dummy JSON, CSV Data
> The raw files are present in the `scrapping/data/` directory in this repository.
Run the following command to generate the dummy data.
``` bash
python scrapping/create_json.py scrapping/data
```
This should create the following directory structure
```bash
fullstack-node-app
├── LICENSE
├── README.md
├── json
│   ├── parents.json
│   ├── students.json
│   └── teachers.json
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

## Next Steps
Now that we have the `json` files, we will push the data to a MongoDB Instance.

>Checkout the `mongodb` branch and follow along the **README** in that branch.

```bash
git checkout mongodb
```
