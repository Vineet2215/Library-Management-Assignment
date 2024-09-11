
const express = require('express');
const router = express.Router();
const { login, logout, signup } = require('../controllers/authController');

router.get('/', (req, res) => {
    res.render('home', { user: req.user });
  });

router.get('/signup', (req, res) => {
  res.render('signup', { user: req.user, error: null });
});

router.post('/signup', signup);

router.get('/login', (req, res) => {
  res.render('login', { user: req.user, error: null });
});
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
