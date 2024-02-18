
const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../model/user');
const connectdb = require('../util/database');

router.use(
  session({
    secret: 'this my secreat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

router.get('/username', (req, res) => {
  res.render('username');
});

router.post('/username', async (req, res) => {
  try {
    connectdb();

    // Ensure the user is authenticated
    if (!req.isAuthenticated()) {
      console.log('User is not authenticated');
      return res.status(401).send('Unauthorized');
    }

    // Access user information after ensuring authentication
    const googleId = req.session.passport.user.info && req.session.passport.user.info.googleId;

    console.log('Received POST request for username:', req.body.username);

    const existingUser = await User.findOne({ displayname: req.body.username });

    if (existingUser) {
      console.log('User already exists, redirecting to /username');
      res.redirect('/username');
    } else {
      const sessionUser = await User.findOne({ googleId });

      if (!sessionUser) {
        console.log('Session user not found for googleId:', googleId);
        return res.status(500).send('Internal Server Error');
      }

      sessionUser.displayName = req.body.username;
      await sessionUser.save();
      console.log('Username updated successfully, redirecting to /musik');
      res.redirect('/musik');
    }
  } catch (err) {
    console.error('Error in POST /username:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
