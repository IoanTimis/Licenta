const User = require('../models/user');
const Faculty = require('../models/faculty');
const Specialization = require('../models/specialization');
const Topic  = require('../models/topic');
const SpecializationTopic = require('../models/specializationTopic');
const TopicRequest = require('../models/topicRequest');
const { Op } = require('sequelize');
const { response } = require('express');
const bcrypt = require('bcryptjs');

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

//Faculties---------------------------------------------------------------------------------------------------
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

//Specializations---------------------------------------------------------------------------------------------------
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

const getFacultySpecializations = async (req, res) => {
  const id = req.params.id;

  try{
    const specializations = await Specialization.findAll({ where: { faculty_id: id } });

    if (specializations.length === 0) {
      return res.status(404).send("Specializations not found");
    }    

    res.json(specializations);
  }catch(error){
    console.error(error);
    res.status(500).send('Server error')
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

//Users---------------------------------------------------------------------------------------------------
const getUsers = async (req, res) => {
  try{
    const users = await User.findAll();
    const faculties = await Faculty.findAll();

    if(!users){
      return res.status(404).send('User not found');
    }

    res.render('pages/admin/users', {users : users, faculties: faculties})
  }catch(error){
    console.error(error);
    res.status(500).send('Server error')
  };

};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    if(user.type === 'student'){
      const faculty = await user.getFaculty();

      if (!faculty) {
        return res.status(404).send('Faculty not found');
      }

      const specialization = await user.getSpecialization();

      if (!specialization) {
        return res.status(404).send('Specialization not found');
      }

      const response = {
        ...user.toJSON(), 
        facultyId: faculty.id, 
        facultyName: faculty.name, 
        specializationId: specialization.id, 
        specializationName: specialization.name, 
      };

      return res.json(response);
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const editUser = async (req, res) => {
  const id = req.params.id;
  const { name, first_name, email, password, title, education_level, faculty_id, specialization_id } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.name = name;
    user.first_name = first_name;
    user.email = email;
    if (password && password.trim()) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hashing parola dacă a fost trimisă
      user.password = hashedPassword;
    }
    user.title = title;
    user.education_level = education_level;
    user.faculty_id = faculty_id;
    user.specialization_id = specialization_id;

    // Salvăm modificările
    await user.save();

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};


const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.destroy({
      where:{
        id: id
      }
    });

    res.json(user);
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
  getFacultySpecializations,
  getSpecialization,
  addSpecialization,
  editSpecialization,
  deleteSpecialization,
  getUsers,
  getUser,
  editUser,
  deleteUser
};