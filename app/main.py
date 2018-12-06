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

from flask import Flask
from jinja2 import Environment, PackageLoader

# load data
from utils import read_csv_as_dict
from utils import read_json_as_dict
import json

# load static data
eda_page_data_dict = {
    'na_counts': read_csv_as_dict('data/na_counts.csv'),
    'summary_stats': read_csv_as_dict('data/summary_stats.csv'),
    'num_reports_by_year': read_csv_as_dict('data/num_report_by_year.csv'),
}

mysql_table = read_json_as_dict('data/mysql/table.json')


env = Environment(
    loader=PackageLoader('main', 'templates'),
    autoescape=True
)

app = Flask(__name__)


@app.route('/')
def index():
    template = env.get_template('data_story.html')
    return template.render()


@app.route('/eda')
def eda():
    template = env.get_template('data_exploratory/eda.html')
    return template.render(**eda_page_data_dict)


@app.route('/analytics')
def analytics():
    template = env.get_template('analytics.html')
    return template.render()


@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500

@app.route('/get_table')
def get_table():
    print(type(mysql_table))
    return json.dumps(mysql_table)

