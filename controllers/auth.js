const sanitizeHtml = require('sanitize-html');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const home = (req, res) => {
  res.render('pages/index');
};

const register = (req, res) => {
  res.render('pages/register');
};

const registerPost = async (req, res) => {
  try {
    var {first_name, name, email, password, type } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    sanitizeHtml(first_name);
    sanitizeHtml(name);
    sanitizeHtml(email);
    
    const userInstance = await user.create({
      first_name: first_name,
      name: name,
      email: email, 
      password: hashedPassword,
      type: type
    });
    res.render('pages/register-success', { user: userInstance });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
};

const login = (req, res, next) => {
  if (req.session.loggedInUser) {
    return res.redirect('/');
  }else{
    res.render('pages/login');
  }
};

const loginPost = async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.render('pages/login', { error: 'Invalid email' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.render('pages/login', { error: 'Invalid password' });
      }

      req.session.loggedInUser = {
        id: user.id,
        first_name: user.first_name,
        name: user.name,
        email: user.email,
        type: user.type
      };

      if(req.session.loggedInUser.type == 'admin'){
        return res.redirect('/admin');
      }else if(req.session.loggedInUser.type == 'teacher'){
        return res.redirect('/teacher');
      }else{
        return res.redirect('/student');
      };

    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).send('Internal Server Error');
    }
  }
};
  

module.exports = {
  home,
  register,
  registerPost,
  login,
  loginPost
};