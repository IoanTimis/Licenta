const express = require('express');

const router  = express.Router(); 

const { isAdmin } = require('../middlewares/admin');

router.use([isAdmin]);

const adminController = require('../controllers/admin'); 

router.get('/', adminController.home);
router.get('/admin/about', adminController.about);


module.exports = router;

