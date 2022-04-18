const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let customer = new Schema({
    name: {
        type: String,
    },
    sdt: {
        type: String,
    },
    infor: {
        type: String,
    },   
    date: {
        type: String,
        default: Date.now
    },
   
})

module.exports = mongoose.model('customer', customer);


