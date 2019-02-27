// const app = require('express')();


const keywordJson = require('../RevisedKeywords.json');

const Keyword = require('../models/keyword');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello');
  });

  // Index
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

  // Create
  app.post('/api/keyword', (req, res) => {
    console.log(req.body);
    const newKeyword = new Keyword(req.body);

    newKeyword.save(() => {
      res.redirect('/api');
    });
  });

  // Update
  app.put('/api/keyword/:id', (req, res) => {
    Keyword.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect(`/api/keyword/${req.params.id}`);
      }).catch((err) => {
        console.log(err.message);
      });
  });

  // Delete
  app.delete('/api/keyword/:id', (req, res) => {
    Keyword.findOneAndDelete({ _id: req.params.id })
      .then(() => {
        res.redirect('/api');
      }).catch((err) => {
        console.log(err.message);
      });
  });

  app.get('/api/keywordJson', () => {
    console.log(keywordJson.length);
    Keyword.insertMany(keywordJson);
  });
};
