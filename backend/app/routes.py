

import json

import os
import stripe

import bson.json_util as json_util

from bson.objectid import ObjectId

from app import *
from .controllers.authControl import *

from flask_cors import CORS


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
     'confirm_password':request.json['confirm_password'],
     'role':0
    }

    statusMsg= registerControl(d)

    if(statusMsg=="ok"): 
        db.users.insert_one(d)
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
        cursor=db.users.find_one({"email":d['email']})
        cursor=json.loads(json_util.dumps(cursor))
    # print(cursor)
        return jsonify(cursor)
    else:
        return  statusMsg,400  

#Restaurant data
# @app.route('/PostRest',methods=['POST'])   
# def restaurantPost():
#     d=dict()
#     d={
#      'RestId':request.json['RestId'],
#      'RestName':request.json['RestName'],
#      'RestEmail':request.json['RestEmail'],
#     'RestLocation':request.json['RestLocation'],
#     'RestDescription':request.json['RestDescription'],
#     'RestRating':request.json['RestRating'],
#     # 'RestImg':request.json[ 'RestImg'],

#     }

    # statusMsg= loginControl(d)

    # if(statusMsg=="ok"): 
    #     # db.sample.insert_one(d)
    #     return "success",200 
    # else:
    #     return  statusMsg,400      

@app.route('/getAllRest',methods=['GET'])
def getALLRest():
    l=list(db.restaurants.find({},{'_id':0}))
    # print(l)
    # for x in range(len(l)):
    #     print(l[x])
    return jsonify(l)
    # return "ok"

#food and items data 
@app.route('/getAllFoods/<string:foodRestId>/',methods=['GET'])
def getAllFoods(foodRestId):
    foodRestId=str(foodRestId)
    cursor=db.foods.find({'foodRestId':foodRestId})
    cursor=json.loads(json_util.dumps(cursor))
    # print(cursor)


    return jsonify(cursor)


@app.route('/getSortFoods/<string:foodRestId>/<string:sortTag>/',methods=['GET'])
def getSortFoods(foodRestId,sortTag):
    foodRestId=str(foodRestId)
    sortTag=str(sortTag)
    cursor=db.foods.find({'foodRestId':foodRestId})
 
    if(sortTag=='asc'):
       
       cursor=cursor.sort('foodPrice')# by default .sort('foodPrice',1)
       cursor=json.loads(json_util.dumps(cursor))
       l=list(cursor)
       print(l)
    
    
    elif(sortTag=='desc'):
       cursor=cursor.sort('foodPrice',-1)# by default .sort('foodPrice',1)
       cursor=json.loads(json_util.dumps(cursor))
       l=list(cursor)
    else:
        cursor=json.loads(json_util.dumps(cursor))
        l=list(cursor)  

    return jsonify(l)    

@app.route('/getRatingFoods/<string:foodRestId>/<string:rating>/',methods=['GET'])
def getRatingFoods(foodRestId,rating):
    foodRestId=str(foodRestId)
    if(rating):
       rating=int(rating)

       cursor=db.foods.find({'foodRestId':foodRestId,'foodRating':rating})
       cursor=json.loads(json_util.dumps(cursor))
       l=list(cursor)  
  
    return jsonify(l)   


@app.route('/getSearchFood/<string:foodRestId>/<string:foodName>/',methods=['GET'])
def getSearchFood(foodRestId,foodName):
    foodRestId=str(foodRestId)
    foodName=str(foodName)
  
    cursor=db.foods.find({'foodRestId':foodRestId,'foodName':foodName})
    cursor=json.loads(json_util.dumps(cursor))
    l=list(cursor)  
  
    return jsonify(l)   

# const res=await axios.get(`/getSingleFood/${id}`,config)    

@app.route('/getSingleFood/<string:id>/',methods=['GET'])

def getSingleFood(id):
    
    id=ObjectId(id)
    # print(id)
    # print(type(id))
    cursor=db.foods.find_one({'_id':id});
    cursor=json.loads(json_util.dumps(cursor))
    # print(cursor)

    return cursor

 #admin foods crud

@app.route('/deleteSingleFood/<string:id>/<string:foodRestId>',methods=['GET'])

def deleteSingleFood(id,foodRestId):
    
    id=ObjectId(id)
  
    db.foods.delete_one({'_id':id});

    cursor=db.foods.find({'foodRestId':foodRestId})
    cursor=json.loads(json_util.dumps(cursor))
    l=list(cursor)  
  
    return jsonify(l) 


@app.route('/insertFood/<string:foodRestId>',methods=['POST'])   

def insertFood(foodRestId):
    d=dict()
   
    d={
      'foodRestId':foodRestId,
      'foodName':request.json['foodName'].capitalize(),
      'foodPrice':request.json['foodPrice'],  
      'foodRating':int(request.json['foodRating']),
      'foodStock':int(request.json['foodStock']),
      'foodCategory':request.json['foodCategory'],
      'foodImg':request.json['foodImg'],
      'foodDescription':'awesome food'
    }
    print(d)
    db.foods.insert_one(d)


    # db.foods.update_one(prev_cursor,new_cursor)
    

    return "insert success",200



@app.route('/updateFood/<string:id>',methods=['PUT'])   

def updateFood(id):
    d=dict()
    d={
      'foodName':request.json['foodName'],
      'foodPrice':request.json['foodPrice'],  
      'foodRating':int(request.json['foodRating']),
      'foodStock':int(request.json['foodStock']),
       'foodImg':request.json['foodImg'],
    }
    # print(d)
    id=ObjectId(id)
    prev_cursor={"_id":id};
  
    new_cursor={ "$set": {
         "foodName": d["foodName"].capitalize(),
         "foodPrice": d["foodPrice"],
         "foodRating": d["foodRating"],
         "foodStock": d["foodStock"],
         "foodImg":d["foodImg"]
         
          } };


    db.foods.update_one(prev_cursor,new_cursor)
    

    return "update success",200

# payment gateway
app.config['STRIPE_PUBLIC_KEY']='pk_test_51KrNyDEYl23s23aNkwOsrUaOMRChU9HJ6xvYclcgFTC94S8HgEbxof7wyqSwq1CiwE1c2plnxnwmAsgxWFWXIlwc00q8Gu6Zwt'
app.config['STRIPE_SECRET_KEY']='sk_test_51KrNyDEYl23s23aN2Jk8BKn6GUttvsAyejKiseY1BQvFkykrg7eUUw4aCRqBtL48DTzmBRecuWUmx8c3hVrSkuNW00hm3iWY1H'
stripe.api_key = app.config['STRIPE_SECRET_KEY']
# price_1LbqGaEYl23s23aNyz0dIjzE
YOUR_DOMAIN = 'http://localhost:3000'
@app.route('/create-checkout-session', methods=['POST'])



def create_checkout_session():

    # line_items_list=[]
    # line_item={}
    # line_item["name"] = 'lol'
    # line_item["description"] = 'awesome'
    # line_item["amount"] = '100'
    # line_item["currency"] = "usd"
    # line_item["id"] = "price_1Lbijw2eZvKYlo2CbOBd3anY",
    # line_item["quantity"] =1
    # line_items_list.append(dict(line_item))

    try:
          checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    'price': 'price_1LbqGaEYl23s23aNyz0dIjzE',
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=YOUR_DOMAIN + '?success=true',
            cancel_url=YOUR_DOMAIN + '?canceled=true',
        )

    except Exception as e:
        return str(e)
     
    return redirect(checkout_session.url, code=303)