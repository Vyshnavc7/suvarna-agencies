var db=require('../config/connection')
module.exports={
    addProduct:(product,callback)=>{
        console.log(product);
        // to insert datas into database in mongo
        db.get().collection('product').insertOne(product).then((data)=>{
            console.log(data);
            callback(data)
            
        })
    }




}