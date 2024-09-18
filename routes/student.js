const express = require('express');
const router  = express.Router(); 

const { isCompleteProfile } = require('../middlewares/completeProfile');
const { isStudent } = require('../middlewares/student');

router.use([isCompleteProfile]);
router.use([isStudent]);

const studentController = require('../controllers/student'); 

router.get('/', studentController.home);
router.get('/about', studentController.about);
router.get('/logout', studentController.logout);
router.get('/topics', studentController.getStudentTopics);
router.get('/topic/:id', studentController.topicPage);
router.get('/request-topics', studentController.getRequestTopics);
router.get('/request-topic/:id', studentController.getRequestTopic);
router.post('/new/request', studentController.newRequest);
router.delete('/delete/request/:id', studentController.deleteRequest);


module.exports = router;
