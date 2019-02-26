const app = require('express')();

const keywordJson = require('../RevisedKeywords.json');

module.exports = app => {
  app.get('/', (req, res) => {
    res.send('Hello');
  });

  app.get('/api', (req, res) => {
    res.send(keywordJson);
  })
};
