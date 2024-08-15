var express = require('express');
var authRoutes = require('./routes/auth.routes');
var entryRoutes = require('./routes/entry.routes');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/entry', entryRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.listen(3000, () => {
    console.log('MONGO_URI:', process.env.DB_URL);
    console.log('Server is running on http://localhost:3000');
    connectDB();
    }
);