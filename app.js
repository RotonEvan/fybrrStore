const express = require('express');
const cors = require('cors');
const path = require('path');
const { urlencoded, json } = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/db/connection');
const mongoose = require('mongoose');
const axios = require('axios');

const User = require('./src/db/user');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(json());
app.use(cookieParser());

//Connection with Database
connectDB();

const { auth } = require('./src/middleware/auth')
const { RegisterUser, LoginUser, LogoutUser, getUserDetails } = require('./src/controller/auth_controller');

app.post('/api/users/register', RegisterUser);
app.post('/api/users/login', LoginUser);
app.get('/api/users/auth', auth, getUserDetails);
app.get('/api/users/logout', auth, LogoutUser);
app.get('/api/users/data', auth, async(req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });
        res.json(user);
    } catch (error) {
        console.log(error);
    }
})

//Serving Home Page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/login.html');
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/views/home.html');
});

app.listen(port, () => {
    console.log(`Express app listening on PORT ${port}`);
});