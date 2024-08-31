const sanitizeHtml = require('sanitize-html');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Faculty = require('../models/faculty');
const Specialization = require('../models/specialization');
const { query } = require('express');

const getSpecializations = async (req, res) => {
  const faculty_id = req.params.id;
  
  try {
      const specializations = await Specialization.findAll({ where: { faculty_id: faculty_id } });
      res.json(specializations);
  } catch (error) {
      console.error('Error fetching specializations:', error);
      res.status(500).send('Internal Server Error');
  }

};


const registerStudent = async (req, res) => {
  try {
    const faculties = await Faculty.findAll();
    return res.render('pages/auth/registerStudent', { faculties: faculties });
  }
  catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  };
};

const registerStudentPost = async (req, res) => {
  try {
    const {first_name, name, email, password, faculty_id, specialization_id, education_level } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    sanitizeHtml(first_name);
    sanitizeHtml(name);
    sanitizeHtml(email);
    
    const userInstance = await User.create({
      first_name: first_name,
      name: name,
      email: email, 
      password: hashedPassword,
      faculty_id: faculty_id,
      specialization_id: specialization_id,
      education_level: education_level,
    });
    res.render('pages/auth/registerSuccess', { user: userInstance });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
};

const registerTeacher = (req, res) => {
  res.render('pages/auth/registerTeacher');
};

const registerTeacherPost = async (req, res) => {
  try {
    const {first_name, name, email, password, title} = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    sanitizeHtml(first_name);
    sanitizeHtml(name);
    sanitizeHtml(email);
    sanitizeHtml(title);
    
    const userInstance = await User.create({
      first_name: first_name,
      name: name,
      email: email,
      title: title,
      password: hashedPassword,
      type: 'teacher'
    });
    res.render('pages/auth/registerSuccess', { user: userInstance });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
};

const login = (req, res, next) => {
  if (req.session.loggedInUser) {
    return res.redirect('/');
  }else{
    res.render('pages/auth/login');
  }
};

const loginPost = async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.render('pages/auth/login', { error: 'Invalid email' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.render('pages/auth/login', { error: 'Invalid password' });
      }

      req.session.loggedInUser = {
        id: user.id,
        first_name: user.first_name,
        name: user.name,
        email: user.email,
        title: user.title,
        specialization_id: user.specialization_id,
        education_level: user.education_level,
        faculty_id: user.faculty_id,
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

const logout = (req, res) => {
  delete req.session.loggedInUser;
  res.redirect('/');
};
  

module.exports = {
  getSpecializations,
  registerTeacher,
  registerTeacherPost,
  registerStudent,
  registerStudentPost,
  login,
  loginPost,
  logout
};