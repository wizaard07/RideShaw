const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    city_name: {
        type: String,
        required: true,
        enum : ['Nadiad','Anand','Vidhyanagar']
    },

    count:{
        type: Number,
        required: true,
        default: 1,
        max : 4
    }, 

    time:{
        type: String,
        required: true,
        enum : ['Morning','Afternoon','Evening','Night']
    },

    reciver : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    users: [{
        
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        granted: {
            type: Boolean,
            default: false
        }
    }]

}, {
    timestamps: true
});

const City = mongoose.model('entry', citySchema);
module.exports = City;


