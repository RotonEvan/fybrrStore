const express = require('require');
const cors = require('cors');
const path = require('path');
const { urlencoded, json } = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const axios = require('axios');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(json());
app.use(cookieParser());