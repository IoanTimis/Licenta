var express = require('express');
var app = express();

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
    cookie: { maxAge: 3600000,secure: false, httpOnly: true }
  })
);

// app.use((req, res, next) => {
//   if (req.session.loggedInUser) {
//     res.locals.user = req.session.loggedInUser.type;
//   } else {
//     res.locals.user = null;
//   }
//   next();
// });


const bcrypt = require('bcryptjs');

app.set('view engine', 'ejs');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//models------------------------------------------------------------------------------------------------------
const sequelize = require('./config/database');
const user = require('./models/user');
const topic = require('./models/topic');

sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database & tables created!');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

const teacherRoutes = require('./routes/teacher');
app.use('/teacher', teacherRoutes);

const studentRoutes = require('./routes/student');
app.use('/student',studentRoutes);

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);


app.listen(8080, () => {
  console.log('Server is running on port 3000');
});
