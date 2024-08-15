var mongoose = require('mongoose');
const { validate } = require('./city');


const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true,
        validate : {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }    
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    contact: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

