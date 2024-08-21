const express = require('express');

const router  = express.Router(); 

const authController = require('../controllers/auth'); 

router.get('/', authController.home);
router.get('/about', authController.about);

router.get('/register/student', authController.registerStudent);
router.post('/register/student', authController.registerStudentPost);

router.get('/register/teacher', authController.registerTeacher);
router.post('/register/teacher', authController.registerTeacherPost);

router.get('/login', authController.login);
router.post('/login', authController.loginPost);
router.get('/logout', authController.logout);


module.exports = router;
