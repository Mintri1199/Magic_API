const mongoose = require('mongoose');

const { Schema } = mongoose;

const KeywordSchema = new Schema({
  title: String,
  definition: String,
});

module.exports = mongoose.model('Keyword', KeywordSchema);
