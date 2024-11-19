const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    userId : String ,
    cartId : String ,
    cartItems :[{
    productId : String ,
    title : String,
    image : String ,
    price : Number,
    quantity : Number
}],
    addressInfo : {
        addressId : String ,
        Address : String ,
        city : String ,
        pincode : String ,
        phone : String ,    
        state : String 
    },
    orderStatus : String ,
    paymentMethod : String ,
    paymentStatus : String ,
    totalAmount :Number ,
    orderDate  : Date,
    orderUpdateDate : Date,
    paymentId : String ,
    payerId : String ,

});

module.exports = mongoose.model('order',orderSchema);