require('dotenv').config();

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const expressValidator = require('express-validator');

const jwt = require('jsonwebtoken');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

// Custom Middleware
const checkAuth = (req, res, next) => {
  console.log('Checking authorization');
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true } || {});
    req.user = decodedToken.payload;
  }
  next();
};
app.use(checkAuth);

// Connect Database
const url = process.env.MONGODB_URI || 'mongodb://localhost/magic-api';
mongoose.connect(url, { useNewUrlParser: true });


// Using controllers
require('./controllers/keywords.js')(app);
require('./controllers/auth')(app);

const port = process.env.PORT || 3000;

app.listen(port);

module.exports = app;
