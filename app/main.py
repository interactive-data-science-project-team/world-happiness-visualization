# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import logging

from flask import Flask, redirect, request
from jinja2 import Environment, PackageLoader

# load data
from utils import read_csv_as_dict
from utils import read_json_as_dict
import json

# connect mysql
import os
import MySQLdb

# load static data
eda_page_data_dict = {
    'na_counts': read_csv_as_dict('data/na_counts.csv'),
    'summary_stats': read_csv_as_dict('data/summary_stats.csv'),
    'num_reports_by_year': read_csv_as_dict('data/num_report_by_year.csv'),
}

mysql_table = read_json_as_dict('data/mysql/table.json')


# mysql
# These environment variables are configured in app.yaml.
# CLOUDSQL_CONNECTION_NAME = os.environ.get('CLOUDSQL_CONNECTION_NAME')
# CLOUDSQL_USER = os.environ.get('CLOUDSQL_USER')
# CLOUDSQL_PASSWORD = os.environ.get('CLOUDSQL_PASSWORD')

CLOUDSQL_DNS = os.environ.get('CLOUDSQL_DNS')
CLOUDSQL_USER = os.environ.get('CLOUDSQL_USER')
CLOUDSQL_PASSWORD = os.environ.get('CLOUDSQL_PASSWORD')
CLOUDSQL_DB_NAME = os.environ.get('CLOUDSQL_DB_NAME')
CLOUDSQL_TABLE_NAME = os.environ.get('CLOUDSQL_TABLE_NAME')

def connect_to_cloudsql():
    db = MySQLdb.connect(
        host=CLOUDSQL_DNS, user=CLOUDSQL_USER, passwd=CLOUDSQL_PASSWORD,
        db=CLOUDSQL_DB_NAME)

    return db




env = Environment(
    loader=PackageLoader('main', 'templates'),
    autoescape=True
)

app = Flask(__name__)


@app.route('/')
def index():
    template = env.get_template('data_story/data_story.html')
    return template.render()


@app.route('/eda')
def eda():
    template = env.get_template('data_exploratory/eda.html')
    return template.render(**eda_page_data_dict)

@app.route('/analytics')
def analytics():
    return redirect('static/analytics_app/index.html')

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500


@app.route('/get_table')
def get_table():
    print(type(mysql_table))
    return json.dumps(mysql_table)


@app.route('/get_attributes', methods=['GET'])
def get_attributes():
    x = request.args['x']
    y = request.args['y']

    db = connect_to_cloudsql()
    cursor = db.cursor()
    sql = 'select {0}, {1} from {2} limit {3}'.format(x, y, CLOUDSQL_TABLE_NAME, 1000)
    print(sql)
    cursor.execute(sql)

    data = [r for r in cursor.fetchall()]
    res = {
        'chart': [[{'x': r[0], 'y': r[1]} for r in data]],
        'google-chart': {
            "cols": [
                {'id': "x", 'label': x, 'type': "number"},
                {'id': "y", 'label': y, 'type': "number"}
            ],
            "rows": [{'c':[{'v':r[0]},{'v':r[1]}]} for r in data]
        }
    }

    return json.dumps(res)

