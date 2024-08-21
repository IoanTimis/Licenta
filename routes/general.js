const express = require('express');
const router  = express.Router();
const generalController = require('../controllers/general');

router.get('/', generalController.home);
router.get('/about', generalController.about);

module.exports = router;