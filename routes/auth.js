const express = require('express');

const router  = express.Router(); 

const authController = require('../controllers/auth');

router.get('/fetch/getSpecializations/:id', authController.getSpecializations);

router.get('/register/student', authController.registerStudent);
router.post('/register/student', authController.registerStudentPost);

router.get('/register/teacher', authController.registerTeacher);
router.post('/register/teacher', authController.registerTeacherPost);

router.get('/login', authController.login);
router.post('/login', authController.loginPost);
router.get('/logout', authController.logout);

router.get('/auth/google', authController.googleLogin);
router.get('/auth/google/callback', authController.googleCallback);
router.get('/complete-profile', authController.completeProfile);
router.get('/complete-profile/teacher', authController.completeProfileTeacher);
router.put('/complete-profile/teacher', authController.completeProfileTeacherPut);
router.get('/complete-profile/student', authController.completeProfileStudent);
router.put('/complete-profile/student', authController.completeProfileStudentPut);


module.exports = router;
