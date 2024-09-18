const express = require('express');
const app = express();

app.use(express.static('public'))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

var dotenv = require('dotenv');
dotenv.config();

var session = require('express-session');
var FileStore = require('session-file-store')(session);


app.use(session({ secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore,
    cookie: { maxAge: 999999999,secure: false, httpOnly: true }
  })
);

app.use((req, res, next) => {
  if (req.session.loggedInUser) {
    res.locals.loggedInUser = req.session.loggedInUser;
  } else {
    res.locals.loggedInUser = null;
  }
  next();
});

const bcrypt = require('bcryptjs');

app.set('view engine', 'ejs');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//models------------------------------------------------------------------------------------------------------
const sequelize = require('./config/database');
const faculty = require('./models/faculty');
const user = require('./models/user');
const specialization = require('./models/specialization');
const topic = require('./models/topic');
const specializationTopic = require('./models/specializationTopic');
const topicRequest = require('./models/topicRequest');


sequelize.sync({ force: false, logging: console.log })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Error creating database:', error);
  });


const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

const teacherRoutes = require('./routes/teacher');
app.use('/teacher', teacherRoutes);

const studentRoutes = require('./routes/student');
app.use('/student', studentRoutes);

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const generalRoutes = require('./routes/general');
app.use('/', generalRoutes);


app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
