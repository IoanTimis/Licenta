const Topic  = require('../models/topic');

const home = (req, res) => {
  res.render('pages/admin/generalPages/index');
};

const about = (req, res) => {
  res.render('pages/admin/generalPages/about');
};

const dashboard = (req, res) => {
  res.render('pages/admin/dashboard');
};




module.exports = {
  home,
  about,
  dashboard
};