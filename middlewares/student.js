function isStudent(req, res, next) {
  if(req.session.loggedInUser){
    if(!req.session.loggedInUser.type){
      return res.redirect('/complete-profile');
    }
  }
  
  if (!req.session.loggedInUser.type === 'student') {
    return res.status(403).send("Access denied.");
  }
  next();
}

module.exports = {
  isStudent
};