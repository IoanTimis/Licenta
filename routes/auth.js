const express = require('express');
const router  = express.Router();

const { isCompleteProfile } = require('../middlewares/completeProfile');

const authController = require('../controllers/auth');

router.get('/fetch/getSpecializations/:id', isCompleteProfile, authController.getSpecializations);

router.get('/register/student', isCompleteProfile, authController.registerStudent);
router.post('/register/student', isCompleteProfile, authController.registerStudentPost);

router.get('/register/teacher', isCompleteProfile, authController.registerTeacher);
router.post('/register/teacher', isCompleteProfile, authController.registerTeacherPost);

router.get('/login', isCompleteProfile, authController.login);
router.post('/login', isCompleteProfile, authController.loginPost);
router.get('/logout', authController.logout);

router.get('/auth/google', authController.googleLogin);
router.get('/auth/google/callback', authController.googleCallback);

router.get('/choose-profile/:token', authController.completeProfile );

router.get('/complete-profile/as-teacher', authController.completeProfileTeacher);
router.put('/complete-profile/as-teacher', authController.completeProfileTeacherPut);

router.get('/complete-profile/as-student', authController.completeProfileStudent);
router.put('/complete-profile/as-student', authController.completeProfileStudentPut);

module.exports = router;
