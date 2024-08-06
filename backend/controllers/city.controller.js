var Entry = require('../models/city.js');
var User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
SECRET_KEY = process.env.JWT_SECRET;

exports.addEntry = async (req, res) => {
    try {
        console.log(req.body)
        let entry = {}
        let token = req.cookies.token;
        console.log(token)
        let id = jwt.verify(token, SECRET_KEY).userId;
        console.log(id)
        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'Not authorised user' });
        }

        entry.city_name = await req.body.city_name;
        entry.user = user;
        entry.time = await req.body.time;

        console.log(entry)

        let create = await Entry.create(entry);

        if (create) {
            return res.status(201).json({ message: 'Entry created successfully' });
        } else {
            return res.status(400).json({ error: 'Entry not created' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


exports.getEntries = async (req, res) => {
    try {
        let city = req.query.city_name;
        let time = req.query.time;

        if (city && time) {
            let entries = await Entry.find({ city_name: city, time: time });
            if (entries) {
                return res.status(200).json(entries);
            } else {
                return res.status(404).json({ error: 'No entries found' });
            }
        }

        else if(city){
            let entries = await Entry.find({ city_name : city });
            if (entries) {
                return res.status(200).json(entries);
            } else {
                return res.status(404).json({ error: 'No entries found' });
            }
        }

        else if(time){
            let entries = await Entry.find({ time : time });
            if (entries) {
                return res.status(200).json(entries);
            } else {
                return res.status(404).json({ error: 'No entries found' });
            }
        }
        else{
           return res.status(404).json({ error: 'No entries found' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


exports.deleteEntry = async (req, res) => {

    try {
        let id = req.params.id;
        let entry = await Entry.findById(id);

        if (!entry) {
            return res.status(404).json({ error: 'Entry not found' });
        }

        let remove = await Entry.deleteOne({ _id: id });

        if (remove) {
            return res.status(200).json({ message: 'Entry deleted successfully' });
        } else {
            return res.status(400).json({ error: 'Entry not deleted' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}
