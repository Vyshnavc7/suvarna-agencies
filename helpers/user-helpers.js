var db=require('../config/connection')
var collection=require('../config/collections');
const async = require('hbs/lib/async');
// used for encryption of password
const bcrypt= require('bcrypt');
const { promise, reject } = require('bcrypt/promises');
const { parseWithoutProcessing } = require('handlebars');
var objectID=require('mongodb').ObjectId
// signing up user
module.exports={
    // addUser:(user)=>{
    //     return new promise(async(resolve,reject)=>{
    //         user.password=await bcrypt.hash(user.password,10)
    //         db.get().collection(collection.USER_COLLECTION).insertOne(user).then((data)=>{
    //             console.log('Data inserted');
    //             console.log(data);
    //             resolve(data)
                
    //         })
    //     })
       
    //  }, 
     addUser:(user,callback)=>{
       
        // to insert datas into database in mongo
        // user.pass= bcrypt.hash(user.pass,10)
            db.get().collection('user').insertOne(user).then((data)=>{
                console.log('Data inserted');
                callback(data)
            })
     },
     doLogin:(user)=>{
         return new Promise(async (resolve,reject)=>{
             let loginStatus=false
             let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({mail:user.email})
            if(user){
                if(pass==user.pass){
                    console.log('login');
                }
            }
         })
     },
     listUser:()=>{
        return new Promise(async(resolve,reject)=>{
            let use=await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(use);
            console.log(use);
        })
        
    },

    listProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
            console.log(products);
        })
        
    },

    deleteUser:(userID)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).remove({_id:objectID(userID)}).then((response)=>{
                resolve(response)
            })
        })
    },
    
}