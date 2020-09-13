const mongoose = require('mongoose');

const AnnoucementSchema = new mongoose.Schema({
    vehicle: {
        title: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        permalink: {
            type: String,
            require: true
        },
        thumbnail: {
            type: String,
            require: true
        }
    },
    address: {
        state_name: {
            type: String,
            require: true
        },
        city_name: {
            type: String,
            require: true
        }
    },
});