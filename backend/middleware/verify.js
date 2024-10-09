const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const SECRET = process.env.JWT_SECRET;

const verifyuser = async (req, res, next) => {
    // console.log(req.cookies);
    const token = await req.cookies.token;
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
        const data = jwt.verify(token, SECRET);
        req.user = data.user;
        console.log("req.user", req.user);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }
}

module.exports = verifyuser;
