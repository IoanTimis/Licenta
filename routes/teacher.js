const express = require('express');

const router  = express.Router(); 

const { isTeacher } = require('../middlewares/teacher');

router.use([isTeacher]);

const teacherController = require('../controllers/teacher'); 

router.get('/', teacherController.home);
router.get('/about', teacherController.about);
router.get('/topics', teacherController.teacherTopics);
router.get('/topic/:id', teacherController.teacherTopic);


module.exports = router;
