const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const SECRET = process.env.JWT_SECRET;
const cookieParser = require('cookie-parser');


const verifyuser = async(req, res, next) => {
    // console.log(req.cookies)
    const token = await req.cookies.token;
    if (!token) {
        return res.sendStatus(401).json({ error: "Unauthorized" })
    }
    
    try {
        console.log(SECRET)
        const data = jwt.verify(token, SECRET);
        req.user = await data.user;
        next();
    } catch (error) {
        res.status(401).sendStatus("Please authenticate using a valid token");
    }
}

module.exports = verifyuser

