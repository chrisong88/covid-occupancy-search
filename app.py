from flask import Flask
from flask import request
from flask_cors import CORS
import sqlite3 as sql
import json

app = Flask(__name__)
CORS(app)

@app.route('/hello')
def say_hello_world():
    return {'result': "Hello World"}

@app.route('/get_occupancy', methods=["GET"])
def get_occupancy():
    zipcode = request.args.get('zipcode')
    with sql.connect("database.db") as con:
        cur = con.cursor()
        cur.execute(f" SELECT hospital, open_adult_icu_beds FROM occupancy WHERE zip='{zipcode}'")
    return(json.dumps(cur.fetchall()))



# def get_occupancy(zip):
#     # hospital_name = request.args.get('')
#     # return(json.dumps(20))
#     with sql.connect("database.db") as con:
#         cur = con.cursor()
#         cur.execute(f" SELECT open_adult_icu_beds FROM occupancy WHERE zip='{zip}'")
#     return(json.dumps(cur.fetchone()))