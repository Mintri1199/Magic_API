const keywordJson = require('../RevisedKeywords.json');

const Keyword = require('../models/keyword');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello');
  });

  // Index
  app.get('/api', (req, res) => {
    Keyword.find().then((all) => {
      res.send(all);
    });
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

  // Populate Database
  app.post('/api/keywordJson', (req, res) => {
    Keyword.insertMany(keywordJson)
      .then(() => {
        res.redirect('/api');
      });
  });

  // Find One with title
  // This is not working
  app.get('/api/find/', (req, res) => {
    console.log(req.body);
    Keyword.find({ title: { $in: req.body.data } })

      .then((all) => {
        res.send(all);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
};
