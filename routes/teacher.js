const express = require('express');

const router  = express.Router(); 

const { isTeacher } = require('../middlewares/teacher');

router.use([isTeacher]);

const teacherController = require('../controllers/teacher'); 

router.get('/', teacherController.home);
router.get('/teacher/about', teacherController.about);


module.exports = router;
