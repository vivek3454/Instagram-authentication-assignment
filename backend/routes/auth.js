const express = require('express');
const { signup, signin, getuser, logout } = require('../controler/authControler');
const {signupDataValidate, jwtAuth, loginDataValidate} = require('../middleware/userMiddlware');
const router = express.Router();

router.post('/signup', signupDataValidate, signup);
router.post('/signin', loginDataValidate, signin);
router.post('/user', jwtAuth, getuser);
router.get('/logout', logout);

module.exports = router