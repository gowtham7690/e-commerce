const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    userId : String,
    Address : String,
    city : String,
    pincode : Number,
    phone : Number,
    notes : String
} , {timestamps : true})

module.exports = mongoose.model('address' , AddressSchema)


