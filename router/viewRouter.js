const express = require('express')
const viewController = require('../controller/viewController')

const router = express.Router();

router.route('/').get(viewController.getHome);

router.route('/login').get(viewController.login)
router.route('/signup').get(viewController.signup)
router.route('/quiz').get(viewController.quiz)

module.exports = router