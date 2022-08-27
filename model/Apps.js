const mongoose = require('mongoose');

const AppsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logourl: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    modfeature: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("apps",AppsSchema)