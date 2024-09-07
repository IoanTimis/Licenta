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
router.get('/faculties', adminController.getFaculty);


module.exports = router;

