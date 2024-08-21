const home = (req, res) => {
  res.render('pages/general/index');
};

const about = (req, res) => {
  res.render('pages/general/about');
};


module.exports = {
  home,
  about
};