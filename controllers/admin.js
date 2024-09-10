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
  try {
    const faculties = await Faculty.findAll({});

    if (!faculties) {
      return res.status(404).send('No faculties found');
    }

    res.render('pages/admin/faculties', { faculties: faculties });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const getFaculty = async (req, res) => {
  const id = req.params.id;

  try {
    const faculty = await Faculty.findByPk(id);

    if (!faculty) {
      return res.status(404).send('No faculty found');
    }

    res.json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const addFaculty = async (req, res) => {
  const { name, description, img_url } = req.body;

  try {
    const faculty = await Faculty.create({
      name: name,
      description: description,
      img_url: img_url
    });

    if(!faculty) {
      return res.status(500).send('Error in creating faculty');
    }

    res.redirect('/admin/faculties')
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const updateFaculty = async (req, res) => {
  const {name, description, img_url } = req.body;
  const id = req.params.id;

  try {
    const faculty = await Faculty.findByPk(id);

    if (!faculty) {
      return res.status(404).send('Faculty not found');
    };

    faculty.name = name;
    faculty.description = description;
    faculty.img_url = img_url;

    await faculty.save();
    
    res.json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const deleteFaculty = async (req, res) => {
  const id = req.params.id;

  try {
    const faculty = await Faculty.destroy({
      where: {
        id: id
      }
    });

    res.json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const getSpecializations = async (req, res) => {

  try {
    const specializations = await Specialization.findAll({
      include:{
        model: Faculty,
        as: 'faculty'
      }
    });

    if(!specializations){
      return res.status(404).send('Specializations not found');
    }

    const faculties = await Faculty.findAll();

    if(!faculties){
      res.status(404).send('Faculties not found');
    }

    res.render('pages/admin/specializations', {specializations: specializations, faculties: faculties})
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const getSpecialization = async (req, res) => {
  const id = req.params.id;

  try {
    const specialization = await Specialization.findByPk(id);

    if (!specialization) {
      return res.status(404).send('Specialization not found');
    }

    res.json(specialization);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const addSpecialization = async (req, res) => {
  const {name, description, faculty_id} = req.body;

  try {
    const specialization = await Specialization.create({
      name: name,
      description: description,
      faculty_id: faculty_id
    });

    if(!specialization){
      return res.status(500).send('Error creating specilization');
    }

    res.redirect('/admin/specializations');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const editSpecialization = async (req, res) => {
  const id = req.params.id;
  const {name, description, faculty_id} = req.body;
  
  try {
    const specialization = await Specialization.findByPk(id);

    if (!specialization) {
      return res.status(404).send('Specialization not found');
    }

    specialization.name = name;
    specialization.description = description;
    specialization.faculty_id = faculty_id;

    await specialization.save();

    const faculty = await Faculty.findByPk(faculty_id);

    if (!faculty) {
      return res.status(404).send('Faculty not found');
    }

    const response = {
      id: specialization.id,
      name: specialization.name,
      description: specialization.description,
      faculty_id: specialization.faculty_id,
      facultyName: faculty.name 
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


const deleteSpecialization = async (req, res) => {
  const id = req.params.id;
  try {

    const specialization = await Specialization.destroy({
      where:{
        id: id
      }
    });

    res.json(specialization);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
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

  getSpecializations,
  getSpecialization,
  addSpecialization,
  editSpecialization,
  deleteSpecialization,


};