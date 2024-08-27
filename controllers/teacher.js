const User = require('../models/user');
const Topic = require('../models/topic');
const { truncateText } = require('../helpers/utils');

const home = (req, res) => {
  res.render('pages/teacher/index');
};

const about = (req, res) => {
  res.render('pages/teacher/about');
};

const teacherTopics = async (req, res) => {
  try{
    const teacherId = req.session.loggedInUser.id;

    const teacher = await User.findByPk(teacherId, {
      include: {
        model: Topic,
        as: 'topics'
      }
    });
  
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.render('pages/teacher/topics', { user: teacher, truncateText: truncateText });
  }
  catch (error) {
    console.error('Error getting topics:', error);
    res.status(500).send('Internal Server Error');
  }
};

const teacherTopic = async (req, res) => {
  try{
    const topicId = req.params.id;

    const topic = await Topic.findByPk(topicId, {
      include: {
        model: User,
        as: 'user'
      }
    }
    );

    if (!topic) {
      return res.status(404).send('Topic not found');
    }

    return res.render('pages/teacher/topic', { topic: topic });
  }
  catch (error) {
    console.error('Error getting topic:', error);
    res.status(500).send('Internal Server Error');
  }
};

const apiTeacherTopic = async (req, res) => {
  try{
    const topicId = req.params.id;

    const topic = await Topic.findByPk(topicId, {
      include: {
        model: User,
        as: 'user'
      }
    }
    );

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    return res.json(topic);
  }
  catch (error) {
    console.error('Error getting topic:', error);
    res.status(500).send('Internal Server Error');
  }
};


const addTopic = async (req, res) => {
  try{
    const teacherId = req.session.loggedInUser.id;

    const { title, description, keywords, slots, specialization } = req.body;

    const topic = await Topic.create({
      title: title,
      description: description,
      keywords: keywords,
      slots: slots,
      specialization: specialization,
      userId: teacherId
    });

    res.json({ topic: topic });
  }
  catch (error) {
    console.error('Error adding topic:', error);
    res.status(500).send('Internal Server Error');
  }
};

const editTopic = async (req, res) => {
  try{
    const topicId = req.params.id;

    const { title, description, keywords, slots, specialization } = req.body;

    const topic = await Topic.findByPk(topicId);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    topic.title = title;
    topic.description = description;
    topic.keywords = keywords;
    topic.slots = slots;
    topic.specialization = specialization;

    await topic.save();

    res.json({ topic: topic });
  }
  catch (error) {
    console.error('Error editing topic:', error);
    res.status(500).send('Internal Server Error');
  }
};






module.exports = {
  home,
  about,
  teacherTopics,
  teacherTopic,
  apiTeacherTopic,
  addTopic,
  editTopic
};