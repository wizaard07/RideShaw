var User = require('../models/user.js');
var Entry = require('../models/entry.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
SECRET_KEY = process.env.JWT_SECRET;

exports.getUser = async (req, res) => {
    try {
        let token = req.cookies.token;
        let id = jwt.verify(token, SECRET_KEY).userId;
        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ user: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


exports.getUserEntry = async (req, res) => {

    try {
        let token = req.cookies.token;
        let id = jwt.verify(token, SECRET_KEY).userId;
        let user = await User.findById(id);
        console.log("getuserentry")

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let entry = await Entry.find({ reciver: user });

        return res.status(200).json({ entry: entry });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

