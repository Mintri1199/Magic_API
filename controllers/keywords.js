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

  // Find One with title
  // Assisted by Edwin Cloud
  app.get('/api/find', (req, res) => {
    let query = '';
    if (req.query.title && typeof req.query.title === 'string') {
      query = req.query.title;
    } else {
      query = req.query.title.join(' ');
    }
    // res.send();
    Keyword.find({ $text: { $search: query } })

      .then((all) => {
        res.send(all);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
};
