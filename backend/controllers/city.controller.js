var Entry = require('../models/entry.js');
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
        entry.reciver = user;
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

exports.getEntry = async (req, res) => {
    try {
        let id = req.params.id;
        let entry = await Entry.findById(id);

        output = {
            city_name: entry.city_name,
            time: entry.time,
            reciver: entry.reciver,
            count: entry.count,
        }

        let token = req.cookies.token;
        let userid = jwt.verify(token, SECRET_KEY).userId;
        
        if(userid in entry.users){
            console.log('yes')
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


exports.sendRequest = async (req, res) => {
    try {
        let token = req.cookies.token;
        let id = jwt.verify(token, SECRET_KEY).userId;
        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'Not authorised user' });
        }

        let entry = await Entry.findById(req.body.id);

        if (!entry) {
            return res.status(404).json({ error: 'Entry not found' });
        }

        let reciver = entry.reciver

        if(entry.count < 4){
            entry.users.push({ userID: user, granted: false });
            entry.count = entry.count + 1;
            let save = await entry.save();
            return res.status(200).json({ message: 'Request sent successfully' });
        }

        else{
            return res.status(400).json({ error: 'There are already 4 members' });
        }

    }

    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.verifyRequest = async (req, res) => {
    try {
        let token = req.cookies.token;
        let id = jwt.verify(token, SECRET_KEY).userId;
        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'Not authorised user' });
        }

        let request = await req.params.id;
        let entry = await Entry.findOne({reciver : user});

        
        if (!entry) {
            return res.status(404).json({ error: 'You do not have any entry' });
        }

        // change the request id grantee to true
        // console.log(entry)
        // console.log(entry.users)
        // console.log(request)

        for(let i=0; i < entry.users.length; i++){
            if(request == entry.users[i]._id.toString()){
                entry.users[i].granted = true;
                let save = await entry.save();
                return res.status(200).json({ message: 'Request granted successfully' });
            }
        }

        // if(entry[0].users[request].granted == false){
        //     entry.users[request].granted = true;
        //     let save = await entry.save();
        //     return res.status(200).json({ message: 'Request granted successfully' });
        // }
        // else{
        //     return res.status(400).json({ error: 'Request already granted' });
        // }
    
    }
    
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}


