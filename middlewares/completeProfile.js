function isCompleteProfile(req, res, next) {
  if(req.session.loggedInUser){
    if(!req.session.loggedInUser.type){
      return res.redirect('/complete-profile');
    }
  }
  
  next();
}

module.exports = {
  isCompleteProfile
};