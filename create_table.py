import sqlite3 as sql

with sql.connect("database.db") as con:
    cur = con.cursor()