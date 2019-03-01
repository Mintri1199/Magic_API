const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const User = require('../models/user');

module.exports = (app) => {
  // SIGN UP
  app.post('/api/sign-up', (req, res) => {
    const user = new User(req.body);

    user.save()
      .then((currentUser) => {
        const token = jwt.sign({ _id: currentUser._id, username: user.username }, secret, { expiresIn: '60 days' });
        res.cookie('nToken', token, { maxAge: 90000, httpOnly: true });
        res.redirect('/api');
      }).catch((err) => {
        console.log(err.message);
        return res.status(400).send({ err: err });
      });
  });
  // LOGOUT
  app.get('/api/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/api');
  });
  // LOGIN
  app.post('/api/login', (req, res) => {
    const { username } = req.body.username;
    const { password } = req.body.password;

    User.findOne({ username }, 'username passsword')
      .then((user) => {
        // User not found
        if (!user) {
          return res.status(401).send({ message: 'Wrong Username and/or Password' });
        }

        // Check of password
        user.comparePassword(password, (_, isMatch) => {
          // if not Match
          if (!isMatch) {
            return res.status(401).send({ message: 'Wrong Username or Password' });
          }
          // Create token
          const token = jwt.sign({ _id: user._id, username: username}, process.env.SECRET, { expiresIn: '60 days' });

          // Set a cookie to redirect to root
          res.cookie('nToken', token, { maxAge: 90000, httpOnly: true });
          res.redirect('/api');
        });
      }).catch((err) => {
        console.log(err);
      });
  });
};
