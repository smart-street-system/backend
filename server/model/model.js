const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    lampName : {
        type : String,
        required: false
    },
    longitude : {
        type: Number,
        required: true,
        unique: true
    },
    lattitude : {
        type: Number,
        required: true,
        unique: true
    },
    isActive :{
    type : Boolean,
    required :false,
    default : true

    }
});

const Lampdb = mongoose.model('Lampdb', schema);

module.exports = Lampdb;