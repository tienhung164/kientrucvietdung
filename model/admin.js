const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let admin = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    }
   
})

module.exports = mongoose.model('admin', admin);