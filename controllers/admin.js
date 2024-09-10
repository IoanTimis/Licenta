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

const getFaculties = async (req, res) => {
  const faculties = await Faculty.findAll({});

  if (!faculties) {
    return res.status(404).send('No faculties found');
  }

  res.render('pages/admin/faculties', { faculties: faculties });
};

const getFaculty = async (req, res) => {
  const id = req.params.id;
  const faculty = await Faculty.findOne({
    where: {
      id: id
    }
  });

  if (!faculty) {
    return res.status(404).send('No faculty found');
  }

  res.json(faculty);
};

const addFaculty = async (req, res) => {
  const { name, description, img_url } = req.body;
  console.log('adaugare facultate');
  console.log(description, img_url);

  const faculty = await Faculty.create({
    name: name,
    description: description,
    img_url: img_url
  });

  if(!faculty) {
    return res.status(500).send('Error in creating faculty');
  }

  res.json(faculty);
};

const updateFaculty = async (req, res) => {
  const {name, description, img_url } = req.body;
  const id = req.params.id;

  const faculty = await Faculty.findByPk(id);

  if (!faculty) {
    return res.status(404).send('Faculty not found');
  };

  faculty.name = name;
  faculty.description = description;
  faculty.img_url = img_url;
  
  res.json(faculty);
};

const deleteFaculty = async (req, res) => {
  const id = req.params.id;

  const faculty = await Faculty.destroy({
    where: {
      id: id
    }
  });

  res.json(faculty);
};



module.exports = {
  home,
  about,
  dashboard,
  getFaculties,
  getFaculty,
  addFaculty,
  updateFaculty,
  deleteFaculty,
};