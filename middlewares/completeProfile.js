function isCompleteProfile(req, res, next) {
  if (req.session.loggedInUser && req.session.loggedInUser.complete_profile === false) {
    return res.redirect('/choose-profile/' + req.session.loggedInUser.id);
  }

  next();
}

module.exports = {
  isCompleteProfile
};