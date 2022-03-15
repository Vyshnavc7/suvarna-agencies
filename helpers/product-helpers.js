var db=require('../config/connection')
var collection=require('../config/collections');
const async = require('hbs/lib/async');
module.exports={
    addProduct:(product,callback)=>{
       
        // to insert datas into database in mongo
        db.get().collection('product').insertOne(product).then((data)=>{
            console.log('Data inserted');
            // console.log(data);
            callback(data)
            
        })
     }, 
     //to list the products in db
    listProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
            console.log(products);
        })
        
    },

    // to insert category in db
    addCategory:(category,callback)=>{
       
        // to insert datas into database in mongo
        db.get().collection('category').insertOne(category).then((data)=>{
            console.log('Data inserted');
            callback(data)
            
        })
     }, 

     viewCategory:()=>{
        return new Promise(async(resolve,reject)=>{
            let categorys=await db.get().collection(collection.CATEGORY_COLLECTION).find().toArray()
            resolve(categorys)
            console.log(categorys);
        })
        
    },

    getProductCount:()=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).count().then((count)=>{
                resolve(count)
            })
        })
    },


}