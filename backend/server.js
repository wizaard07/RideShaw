var express = require('express');
var authRoutes = require('./routes/auth.routes');
var entryRoutes = require('./routes/entry.routes');
var userRoutes = require('./routes/user.routes');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/entry', entryRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
    connectDB();
    }
);