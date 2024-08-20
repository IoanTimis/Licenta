function isAdmin(req, res, next) {
  if (!req.session.loggedInUser || !req.session.loggedInUser.type === 'admin') {
    return res.status(403).send("Access denied.");
  }
  next();
}

module.exports = {
  isAdmin
};