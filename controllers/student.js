const Topic = require('../models/topic');
const Specialization = require('../models/specialization');
const SpecializationTopic = require('../models/specializationTopic');
const User = require('../models/user');
const { truncateText } = require('../helpers/utils');

const home = (req, res) => {
  res.render('pages/student/index');
};

const about = (req, res) => {
  res.render('pages/student/about');
};

const getStudentTopics = async (req, res) => {
  try {
    const specialization_id = req.session.loggedInUser.specialization_id;
    const education_level = req.session.loggedInUser.education_level;

    const specialization = await Specialization.findByPk(specialization_id);
    if (!specialization) {
      return res.status(404).json({ message: 'Specialization not found' });
      }
      //Posibil sa fie nevoie de modificari pt a nu afisa ce topicurile de masterat sau licenta in functie de nivelul de studii
    const topics = await specialization.getTopics({
      where: {
        education_level: education_level
      },
      include: [{
        model: User,  
        as: 'user'   
      }]
    });

    if (!topics) {
      return res.status(404).json({ message: 'Topics not found' });
    };

   return res.render('pages/student/topics', { topics: topics, truncateText: truncateText });

  }
  catch (error) {
    console.error('Error getting topics:', error);
    res.status(500).send('Internal Server Error');
  }
};

const topicPage = async (req, res) => {
  try {
    const topic_id = req.params.id;

    const topic = await Topic.findByPk(topic_id, {
      include: [{
        model: User,
        as: 'user'
      }]
    });
    
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    return res.render('pages/student/topic', { topic: topic });
  }
  catch (error) {
    console.error('Error getting topic:', error);
    res.status(500).send('Internal Server Error');
  }
};






module.exports = {
  home,
  about,
  getStudentTopics,
  topicPage
};