from flask import Flask, render_template,request,jsonify,redirect
from .dbconn import db

app = Flask(__name__,
            static_url_path='',
            static_folder='public')

from app import routes



# d = dict()
# d={
#     "1":"murshad",
#     "2":"karim"
# }
# db.sample.insert_one(d)