const mongoose = require('mongoose');
const User = require('./user');

const reqSchema = new mongoose.Schema({

    sender : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },

    receiver : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },

    status:{
        type: String, 
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    }
}, 
{timestamps : true}
)

const Request = mongoose.model('Request', reqSchema);

module.exports = Request;

