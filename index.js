require('dotenv').config();

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const expressValidator = require('express-validator');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());


// Connect Database
const url = process.env.MONGODB_URI || 'mongodb://localhost/magic-api';
mongoose.connect(url, { useNewUrlParser: true });


// Using controllers
require('./controllers/keywords.js')(app);
require('./controllers/auth')(app);

const port = process.env.PORT || 3000;

app.listen(port);

module.exports = app;
