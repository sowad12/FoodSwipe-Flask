from app import *
from .controllers.authControl import *
from flask_cors import CORS
import bcrypt

CORS(app)
@app.route('/')
def home():
    return "<h1>hello</h1>"


@app.route('/about')
def about():
    return "<h1>about us</h1>"


@app.route('/registration',methods=['POST'])   
def reg():
    d=dict()
    d={
     'name':request.json['name'],
     'email':request.json['email'],
     'password':request.json['password'],
     'confirm_password':request.json['confirm_password']
    }

    statusMsg= registerControl(d)

    if(statusMsg=="ok"): 
        db.sample.insert_one(d)
        return "success",200 
    else:
        return  statusMsg,400    
   
@app.route('/login',methods=['POST'])   
def login():
    d=dict()
    d={
    
     'email':request.json['email'],
     'password':request.json['password']

    }

    statusMsg= loginControl(d)

    if(statusMsg=="ok"): 
        # db.sample.insert_one(d)
        return "success",200 
    else:
        return  statusMsg,400  