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
    timestamp: {
        type: Date,
        default: Date.now
    },
    user: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: false
    },
    
});

const City = mongoose.model('City', citySchema);
module.exports = City;


