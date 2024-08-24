const express = require('express');

const router  = express.Router(); 

const { isStudent } = require('../middlewares/student');

router.use([isStudent]);

const studentController = require('../controllers/student'); 

router.get('/', studentController.home);
router.get('/about', studentController.about);
router.get('/topics', studentController.topics);


module.exports = router;
