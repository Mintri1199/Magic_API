// const app = require('express')();

const keywordJson = require('../RevisedKeywords.json');

const Keyword = require('../models/keyword');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello');
  });

  app.get('/api', (req, res) => {
    res.send(keywordJson);
  });

  app.post('/api/keyword', (req, res) => {
    // let newKeyword = req.params.keyword;
    console.log(req.body);
    const newKeyword = new Keyword(req.body);

    newKeyword.save(() => {
      res.redirect('/api');
    });
  });
};
