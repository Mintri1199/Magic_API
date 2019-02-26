const express = require('express');

const app = express();

const mongoose = require('mongoose');

// Using controllers
require('./controllers/keywords')(app);

// Connect Database
const url = 'mongodb://localhost/magic-api';
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Error'));
mongoose.set('debug', true);

const port = process.env.PORT || 3000;

app.listen(port);

module.exports = app;
