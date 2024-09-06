const Topic  = require('../models/topic');
//geralPages
const home = (req, res) => {
  res.render('pages/admin/generalPages/index');
};

const about = (req, res) => {
  res.render('pages/admin/generalPages/about');
};

//dashboard
const dashboard = (req, res) => {
  res.render('pages/admin/dashboard');
};

const getFaculty = (req, res) => {
  res.render('pages/admin/faculty');
};






module.exports = {
  home,
  about,
  dashboard,
  getFaculty
};