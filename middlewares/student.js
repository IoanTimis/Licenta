function isStudent(req, res, next) {
  if (!req.session.loggedInUser || !req.session.loggedInUser.type === 'student') {
    return res.status(403).send("Access denied.");
  }
  next();
}

module.exports = {
  isStudent
};