const express = require('express');

const router  = express.Router(); 

const { isStudent } = require('../middlewares/student');

router.use([isStudent]);

const studentController = require('../controllers/student'); 

router.get('/', studentController.home);
router.get('/about', studentController.about);
router.get('/topics', studentController.getStudentTopics);
router.get('/topic/:id', studentController.topicPage);
router.get('/request-topics', studentController.getRequestTopics);
router.get('/request-topic/:id', studentController.getRequestTopic);


module.exports = router;
