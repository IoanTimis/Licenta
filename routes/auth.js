const express = require('express');

const router  = express.Router(); 

const authController = require('../controllers/auth'); 

router.get('/', authController.home);
router.get('/about', authController.about);

router.get('/register', authController.register);
router.post('/register', authController.registerPost);

router.get('/login', authController.login);
router.post('/login', authController.loginPost);
router.get('/logout', authController.logout);


module.exports = router;
