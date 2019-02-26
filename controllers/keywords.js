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

  // Read
  app.get('/api/keyword/:id', (req, res) => {
    Keyword.findById(req.params.id)
      .then((word) => {
        res.send(word);
      }).catch((err) => {
        console.log(err.message);
      });
  });

  app.post('/api/keyword', (req, res) => {
    console.log(req.body);
    const newKeyword = new Keyword(req.body);

    newKeyword.save(() => {
      res.redirect('/api');
    });
  });
};
