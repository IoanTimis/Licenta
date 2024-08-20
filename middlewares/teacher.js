function isTeacher(req, res, next) {
  if (!req.session.loggedInUser || !req.session.loggedInUser.type === 'teacher') {
    return res.status(403).send("Access denied.");
  }
  next();
}

module.exports = {
  isTeacher
};