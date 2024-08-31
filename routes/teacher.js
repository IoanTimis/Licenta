const express = require('express');

const router  = express.Router(); 

const { isTeacher } = require('../middlewares/teacher');

router.use([isTeacher]);

const teacherController = require('../controllers/teacher'); 

router.get('/', teacherController.home);
router.get('/about', teacherController.about);
router.get('/logout', teacherController.logout);
router.get('/topics', teacherController.teacherTopics);
router.get('/topic/:id', teacherController.teacherTopic);
router.get('/api/topic/:id', teacherController.apiTeacherTopic);
router.get('/getSpecializations/:id', teacherController.getSpecializations);
router.post('/topic/add', teacherController.addTopic);
router.put('/topic/edit/:id', teacherController.editTopic);
router.delete('/topic/delete/:id', teacherController.deleteTopic);


module.exports = router;
