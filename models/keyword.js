const mongoose = require('mongoose');

const { Schema } = mongoose;

const KeywordSchema = new Schema({
  title: String,
  definition: String,
});
KeywordSchema.index({ title: 'text' });

module.exports = mongoose.model('Keyword', KeywordSchema);
