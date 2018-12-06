import csv
import json


def read_csv_as_dict(filepath):
    with open(filepath, mode='r') as infile:
        reader = csv.DictReader(infile)
        return [r for r in reader]


def read_json_as_dict(filepath):
    with open(filepath, mode='r') as infile:
        reader = json.load(infile)
        return reader
