from flask import Flask, render_template,request,jsonify
from .dbconn import db
app = Flask(__name__)

from app import routes



# d = dict()
# d={
#     "1":"murshad",
#     "2":"karim"
# }
# db.sample.insert_one(d)