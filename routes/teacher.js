const express = require('express');

const router  = express.Router(); 

const { isTeacher } = require('../middlewares/teacher');

router.use([isTeacher]);

const teacherController = require('../controllers/teacher'); 

router.get('/', teacherController.home);


module.exports = router;
