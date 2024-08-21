const home = (req, res) => {
  res.render('pages/student/index');
};

const about = (req, res) => {
  res.render('pages/student/about');
};







module.exports = {
  home,
  about
};