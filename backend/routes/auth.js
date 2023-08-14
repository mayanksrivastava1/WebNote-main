const express = require('express');
const router = express.Router()
const authController = require('../controllers/authController');
const { loginCheck,signupCheck } = require('../middlewares/userCheck');
const userFetch = require('../middlewares/userFetch')

router.post('/signup',signupCheck,authController.signup)
router.post('/login',loginCheck,authController.login)
router.get('/fetchUser',userFetch,authController.fetchUser)

module.exports = router