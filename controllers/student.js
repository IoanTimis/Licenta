const home = (req, res) => {
  res.render('pages/student/index');
};

const about = (req, res) => {
  res.render('pages/student/about');
};

const topics = (req, res) => {
  res.render('pages/student/topics');
};






module.exports = {
  home,
  about,
  topics
};