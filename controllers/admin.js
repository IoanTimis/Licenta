const User = require('../models/user');
const Faculty = require('../models/faculty');
const Specialization = require('../models/specialization');
const Topic  = require('../models/topic');
const SpecializationTopic = require('../models/specializationTopic');
const TopicRequest = require('../models/topicRequest');
const { Op } = require('sequelize');

//geralPages
const home = (req, res) => {
  res.render('pages/admin/generalPages/index');
};

const about = (req, res) => {
  res.render('pages/admin/generalPages/about');
};

//dashboard
const dashboard = (req, res) => {
  res.render('pages/admin/dashboard');
};

const getFaculty = (req, res) => {
  const faculties = Faculty.findAll({});
  
  res.render('pages/admin/faculties');
};






module.exports = {
  home,
  about,
  dashboard,
  getFaculty
};