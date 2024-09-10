const express = require('express');

const router  = express.Router(); 

const { isAdmin } = require('../middlewares/admin');

router.use([isAdmin]);

const adminController = require('../controllers/admin'); 

//General Pages
router.get('/', adminController.home);
router.get('/about', adminController.about);

//Dashboard Pages
router.get('/dashboard', adminController.dashboard);

router.get('/faculties', adminController.getFaculties);
router.get('/faculty/get/:id', adminController.getFaculty);
router.post('/faculty/add', adminController.addFaculty);
router.put('/faculty/update/:id', adminController.updateFaculty);
router.delete('/faculty/delete/:id', adminController.deleteFaculty);

router.get('/specializations', adminController.getSpecializations);
router.get('/specialization/get/:id', adminController.getSpecialization);
router.post('/specialization/add', adminController.addSpecialization);
router.put('/specialization/update/:id', adminController.editSpecialization);
router.delete('/specialization/delete/:id', adminController.deleteSpecialization);



module.exports = router;

