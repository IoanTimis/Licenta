function isTeacher(req, res, next) {
  if(req.session.loggedInUser){
    if(!req.session.loggedInUser.type){
      return res.redirect('/complete-profile');
    }
  }

  if (!req.session.loggedInUser.type === 'teacher') {
    return res.status(403).send("Access denied.");
  }
  next();
}

module.exports = {
  isTeacher
};