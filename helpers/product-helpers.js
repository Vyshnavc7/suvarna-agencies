var db=require('../config/connection')
var collection=require('../config/collections');
const async = require('hbs/lib/async');
const { promise, reject } = require('bcrypt/promises');
const { response } = require('express');
var objectID=require('mongodb').ObjectId
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
//  for product edit and delete
    deleteProduct:(productID)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).remove({_id:objectID(productID)}).then((response)=>{
                resolve(response)
            })
        })
    },

    getProductDetails:(productID)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectID(productID)}).then((product)=>{
                resolve(product)
            })
        })
    },

    updateProduct:(productID,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:objectID(productID)},{
                $set:{
                    name:proDetails.name,
                    price:proDetails.price,
                    det:proDetails.det
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
// ----------------------++------------------

// for category edit and delete
    deleteCategory:(categoryID)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CATEGORY_COLLECTION).remove({_id:objectID(categoryID)}).then((response)=>{
                resolve(response)
            })
        })
    },
        // to update category
    getCategoryDetails:(categoryID)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CATEGORY_COLLECTION).findOne({_id:objectID(categoryID)}).then((category)=>{
                resolve(category)
            })
        })
    },

    updateCategory:(categoryID,catDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CATEGORY_COLLECTION)
            .updateOne({_id:objectID(categoryID)},{
                $set:{
                    Name:catDetails.name
                }
            }).then((response)=>{
                resolve()
            })
        })
    }


}