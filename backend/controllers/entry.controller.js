var Entry = require('../models/entry.js');
var User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer')
dotenv.config();
SECRET_KEY = process.env.JWT_SECRET;

exports.addEntry = async (req, res) => {
    try {
        // console.log(req.body)
        let entry = {}
        let token = req.cookies.token;
        let id = jwt.verify(token, SECRET_KEY).userId;
        let user = await User.findById(id);
        // console.log(user)

        if (!user) {
            return res.status(404).json({ error: 'Not authorised user' });
        }

        entry.city_name = await req.body.city_name;
        entry.reciver = user;
        entry.time = await req.body.time;

        // console.log(entry)

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


exports.test = async (req, res) => {
    try {
        let entries = await Entry.find();
        return res.status(200).json(entries);
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
        let city = await req.query.city_name;
        let time = await req.query.time;

        // console.log("time"+time)

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

            let response = []

            entries.forEach(async(element) =>{
                // console.log(element.reciver.toString())
                let reciver = await User.findById(element.reciver.toString())
                // console.log(reciver.username)
            });           

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

exports.getPending = async (req, res) => {
    try {
        let user = req.user;
        let entry = await Entry.find({ reciver: user });

        if (!entry || entry.length === 0) {
            return res.status(404).json({ error: 'No entries found' });
        }

        let pending = entry[0].pending;

        if (pending.length === 0) {
            return res.status(404).json({ error: 'No pending requests' });
        }

        // Using Promise.all to handle asynchronous operations in parallel
        let response = await Promise.all(
            pending.map(async (element) => {
                let user = await User.findById(element.toHexString());
                return user; // Each user object will be added to the response array
            })
        );

        console.log("response", response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



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
        let id = req.user;
        let entry_id = req.params.id;
        
        // Find the user by id
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'Not authorized user' });
        }

        // Find the entry by id
        let entry = await Entry.findById(entry_id);
        if (!entry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        // console.log("entry", entry)
        let receiver_id = entry.reciver;

        // Check entry limit and add user to pending if allowed
        if (entry.count < 4) {
            entry.pending.push(id);
            let savedEntry = await entry.save();

            // Configure transporter with secure environment variables
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // Use TLS
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                tls: {
                    rejectUnauthorized: false // Disable certificate validation for debugging
                }
            });

            let receiver = await User.findById(receiver_id.toHexString());
            console.log("reciever", receiver)

            // Email options
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: receiver.email,
                subject: 'News Update',
                text: `You have a new request from ${user.username}`
            };

            // Send the email asynchronously
            try {
                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            } catch (emailError) {
                console.error('Error sending email:', emailError);
                return res.status(400).json({ error: 'Request not sent' });
            }

            if (savedEntry) {
                return res.status(200).json({ message: 'Request sent successfully' });
            } else {
                return res.status(400).json({ error: 'Request not saved' });
            }
        } else {
            return res.status(400).json({ error: 'There are already 4 members' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports.verifyRequest = async (req, res) => {
    try {
        const { grant,  request } = req.body;
        console.log("req.body", req.body)
        const id = req.user;
        // console.log("grant", grant)

        // Fetch the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'Not authorized user' });
        }

        // Find the entry with the user as the receiver
        const entry = await Entry.findOne({ reciver: user });
        if (!entry) {
            return res.status(404).json({ error: 'You do not have any entry' });
        }

        // Check if the request is in the pending list
        const index = entry.pending.indexOf(request);
        console.log("index",index)
        if (index === -1) {
            return res.status(400).json({ error: 'Request not found' });
        }

        if ((grant === 'true' || grant === true ) ) {
            // Grant the request: remove from pending, add to users, and increment count
            entry.pending.splice(index, 1);
            entry.users.push(request);
            entry.count += 1;
        } else if (grant === 'false' || grant === false) {
            // Deny the request: simply remove from pending
            entry.pending.splice(index, 1);
        } else if (entry.count < 4){
            return res.status(400).json({error: 'There are already 4 members'})
        }
        else {
            return res.status(400).json({ error: 'Invalid grant value' });
        }

        // Save the updated entry
        const save = await entry.save();
        if (save) {
            const message = grant === true ? 'Request granted successfully' : 'Request denied successfully';
            return res.status(200).json({ message });
        } else {
            return res.status(400).json({ error: 'Failed to update request' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



exports.getReq = async () => {
    let user = req.user
    
}