var db = require('../config/connection')
var collection = require('../config/collections');
const productHelpers = require('../helpers/product-helpers');
const async = require('hbs/lib/async');
// used for encryption of password
const bcrypt = require('bcrypt');
const { promise, reject } = require('bcrypt/promises');
const { parseWithoutProcessing } = require('handlebars');
var objectID = require('mongodb').ObjectId
// signing up user
module.exports = {
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
    addUser: (user, callback) => {

        // to insert datas into database in mongo
        // user.pass= bcrypt.hash(user.pass,10)

        db.get().collection('user').insertOne(user).then((data) => {
            console.log('User inserted');
            callback(data)
            resolve(data.ops[0])
        })


    },
    doLogin: (userData) => {
        // let email1 = req.body.mail

        return new Promise(async (resolve, reject) => {

            let loginStatus = false
            let response = {}

            var user = await db.get().collection(collection.USER_COLLECTION).find({ email: userData.mail }).toArray()
            let pass = user[0].pass

            if (user[0]) {
                if (pass == user[0].pass) {
                    productHelpers.listProducts().then((products) => {

                        response.user = user
                        response.status = true
                        console.log(products);
                        resolve({ products, response })

                    })
                } else {
                    console.log("Pass Does'nt MAtch");
                    response.status = false


                    resolve({ response })
                }
            } else {
                console.log('User Not exist');
                response.status = false
                resolve({ response })
            }
        })
    },


    listUser: () => {
        return new Promise(async (resolve, reject) => {
            let use = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(use);
            console.log(use);
        })

    },
    deleteUser: (userID) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).remove({ _id: objectID(userID) }).then((response) => {
                resolve(response)
            })
        })
    },


    listProducts: () => {
        return new Promise(async (resolve, reject) => {
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
            console.log(products);
        })

    },


    addStaff: (staff, callback) => {

        db.get().collection('staff').insertOne(staff).then((data) => {
            console.log('Data inserted');
            callback(data)
        })
    },

    viewStaff: () => {
        return new Promise(async (resolve, reject) => {
            let staff = await db.get().collection(collection.STAFF_COLLECTION).find().toArray()
            resolve(staff);
            console.log(staff);
        })

    },

    deleteStaff: (staffID) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.STAFF_COLLECTION).remove({ _id: objectID(staffID) }).then((response) => {
                resolve(response)
            })
        })
    },

    getStaffDetails: (staffID) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.STAFF_COLLECTION).findOne({ _id: objectID(staffID) }).then((staff) => {
                resolve(staff)
            })
        })
    },

    updateStaff: (staffID, staffDetails) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.STAFF_COLLECTION)
                .updateOne({ _id: objectID(staffID) }, {
                    $set: {
                        name: staffDetails.name,
                        phone: staffDetails.phone,
                        age: staffDetails.age,
                        place: staffDetails.place

                    }
                }).then((response) => {
                    resolve()
                })
        })
    },



    contactSub: (contact, callback) => {
        db.get().collection('contact').insertOne(contact).then((data) => {
            console.log('contact is ', contact);
            console.log('Contact Inserted');
            callback(data)
        })
    },

    viewFeedback: () => {
        return new Promise(async (resolve, reject) => {
            let contact1 = await db.get().collection(collection.FEEDBACK_COLLECTION).find().toArray()
            resolve(contact1);
            console.log(contact1);
        })

    },
}