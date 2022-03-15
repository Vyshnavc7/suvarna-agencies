var db=require('../config/connection')
module.exports={
    addProduct:(product,callback)=>{
       
        // to insert datas into database in mongo
        db.get().collection('product').insertOne(product).then((data)=>{
            console.log('Data inserted');
            // console.log(data);
            callback(data)
            
        })
    }




}