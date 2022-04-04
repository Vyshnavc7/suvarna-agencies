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
    //  to view the category in mongo
     viewCategory:()=>{
        return new Promise(async(resolve,reject)=>{
            let categorys=await db.get().collection(collection.CATEGORY_COLLECTION).find().toArray()  
            resolve(categorys)
            console.log(categorys);
        })
        
    },
    // to get the count of products in product
    getProductCount:()=>{
        return new Promise(async (resolve,reject)=>{
            let productcount= await db.get().collection(collection.PRODUCT_COLLECTION).count()
                resolve(productcount)
                console.log(productcount);
            
        })
    },
    // to get the count of categories in category
    getCategoryCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let categorycount=await db.get().collection(collection.CATEGORY_COLLECTION).count()
                resolve(categorycount)
                console.log(categorycount);
            
        })
    },

    // to get the count of user in category
    getUserCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let usercount=await db.get().collection(collection.USER_COLLECTION).count()
                resolve(usercount)
                console.log(usercount);
            
        })
    },
    
}