var express = require('express');
var router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')

router.get('/', auth, async (req, res) => {
  res.send(req.user);
})

router.post('/register', async (req, res) => {
  const userData = req.body.data;
  console.log(userData);
  const user = User(userData);
  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.send({ user, token });

  } catch (err) {
    res.send(err);
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    console.log(user, token);
    res.send({ user, token })
  } catch (err) {
    res.status(400).send(err);
  }
})

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens.filter(token => token !== req.token);
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }

})

module.exports = router;
