const home = (req, res) => {
  res.render('pages/teacher/index');
};

const about = (req, res) => {
  res.render('pages/teacher/about');
};






module.exports = {
  home,
  about
};