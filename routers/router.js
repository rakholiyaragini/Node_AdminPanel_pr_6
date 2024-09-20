const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const signUp = require('../controllers/signUpController');
const logIn = require('../controllers/loginController');

router.get('/' , controller.defaultController);
router.get('/signUp',signUp.signUpform)
router.post('/signUpController',signUp.signUpController)
router.get('/logIn',logIn.logIn)
router.post('/logInController',logIn.logInController)

module.exports = router;