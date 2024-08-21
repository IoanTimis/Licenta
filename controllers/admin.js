const Topic  = require('../models/topic');

const home = (req, res) => {
  res.render('pages/admin/index');
};

const about = (req, res) => {
  res.render('pages/admin/about', {topics: []});
};




module.exports = {
  home,
  about
};