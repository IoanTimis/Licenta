const User = require('../models/user');
const Topic = require('../models/topic');

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

    res.render('pages/teacher/topics', { user: teacher });
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
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.render('pages/teacher/topic', { topic: topic });
  }
  catch (error) {
    console.error('Error getting topic:', error);
    res.status(500).send('Internal Server Error');
  }
};






module.exports = {
  home,
  about,
  teacherTopics,
  teacherTopic
};