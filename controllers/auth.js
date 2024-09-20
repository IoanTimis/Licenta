const sanitizeHtml = require('sanitize-html');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Faculty = require('../models/faculty');
const Specialization = require('../models/specialization');
const CompleteProfileToken = require('../models/completeProfileToken');
const axios = require('axios');
const crypto = require('crypto');


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
  const {first_name, name, email, password, faculty_id, specialization_id, education_level } = req.body;
  sanitizeHtml(first_name);
  sanitizeHtml(name);
  sanitizeHtml(email);

  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    
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
  const {first_name, name, email, password, title} = req.body;
  sanitizeHtml(first_name);
  sanitizeHtml(name);
  sanitizeHtml(email);
  sanitizeHtml(title);

  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    
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
    console.log("esti logat deja:",req.session.loggedInUser);
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
        type: user.type,
        complete_profile: user.complete_profile,
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

//google auth----------------------------------------------------------------------------------------------------------------
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:8080/auth/google/callback';

// Google Login Flow
const googleLogin = (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
};

function generateRandomPassword() {
  return crypto.randomBytes(16).toString('hex');
}

async function generateTokenAndScheduleDeletion(userId) {
  try {
    const token = crypto.randomBytes(32).toString('hex');
    const createdToken = await CompleteProfileToken.create({
      token: token,
      user_id: userId
    });

    if (!createdToken) {
      throw new Error('Failed to create token');
    }

    console.log(`Token created with ID: ${createdToken.id}`);

    setTimeout(async () => {
      try {
        await CompleteProfileToken.destroy({
          where: {
            id: createdToken.id
          }
        });
        console.log(`Token with ID: ${createdToken.id} has been deleted`);
      } catch (innerError) {
        console.error('Failed to delete token:', innerError);
      }
    }, 5 * 60 * 1000); // 5 minute

    return token;
  } catch (error) {
    console.error('Failed to create or delete token:', error);
    throw error;
  }
}


// Google Callback
const googleCallback = async (req, res) => {
  const { code } = req.query;
  
  try {
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token } = data;
    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const randomPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(randomPassword, 8);

    const user = await User.findOrCreate({
      where: { email: profile.email },
      defaults: {
        first_name: profile.given_name,
        name: profile.family_name,
        email: profile.email,
        password: hashedPassword,
        complete_profile: false,
      }
    });

    const [createdUser, created] = user;
    
    if(!created && createdUser.complete_profile){
      req.session.loggedInUser = {
        id: createdUser.id,
        first_name: createdUser.first_name,
        name: createdUser.name,
        email: createdUser.email,
        title: createdUser.title,
        specialization_id: createdUser.specialization_id,
        education_level: createdUser.education_level,
        faculty_id: createdUser.faculty_id,
        type: createdUser.type,
        complete_profile: createdUser.complete_profile,
      };
      
      if(req.session.loggedInUser.type == 'student'){
        return res.redirect('/student');
      }else{
        return res.redirect('/teacher');
      }
    }else{
      const id = createdUser.id;

      const token = await generateTokenAndScheduleDeletion(id);
      
      return res.redirect(`http://www.licentatest.com/choose-profile/${token}`);
    }

  } catch (error) {
    console.error('Error in Google Callback:', error.message);
    res.status(500).send('Google callback error');
  }
};

const completeProfile = async (req, res) => {
  const token = req.params.token;

  try{
    const completeProfileToken = await CompleteProfileToken.findOne({ where: { token: token } });

    if(!completeProfileToken){
      return res.status(404).send('Token not found');
    }
    const id = completeProfileToken.user_id;

    const user = await User.findByPk(id);
    
    if(!user){
      return res.status(404).send('User not found');
    }

    req.session.loggedInUser = {
      id: user.id,
      first_name: user.first_name,
      name: user.name,
      email: user.email,
      complete_profile: user.complete_profile,
    };
    
  }catch(error){
    console.error('Error completing profile:', error);
    res.status(500).send('Internal Server Error');
  }
  res.render('pages/auth/completeProfile');
};

const completeProfileStudent = async (req, res) => {
  try {
    const faculties = await Faculty.findAll();
    res.render('pages/auth/completeProfileStudent', { faculties: faculties });
  }
  catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  };
};

const completeProfileStudentPut = async (req, res) => {
  const id = req.session.loggedInUser.id;
  const {faculty_id, specialization_id, education_level} = req.body;

  try{
    const user = await User.findByPk(id);
    user.faculty_id = faculty_id;
    user.specialization_id = specialization_id;
    user.education_level = education_level;
    user.type = 'student';
    user.complete_profile = true;
    await user.save();

    req.session.loggedInUser.faculty_id = faculty_id;
    req.session.loggedInUser.specialization_id = specialization_id;
    req.session.loggedInUser.education_level = education_level
    req.session.loggedInUser.type = 'student';
    req.session.loggedInUser.complete_profile = true;

    console.log('req.session.loggedInUser dupa completare profil:', req.session.loggedInUser);

    res.status(200).send('Profile updated successfully!');
  }
  catch(error){
    console.error('Error completing profile:', error);
    res.status(500).send('Internal Server Error');
  }
};

const completeProfileTeacher = async (req, res) => {
  res.render('pages/auth/completeProfileTeacher');
};

const completeProfileTeacherPut = async (req, res) => {
  const id = req.session.loggedInUser.id;
  const {title} = req.body;

  try{
    const user = await User.findByPk(id);
    user.title = title;
    user.type = 'teacher';
    user.complete_profile = true;
    await user.save();

    req.session.loggedInUser.title = title;
    req.session.loggedInUser.type = 'teacher';
    req.session.loggedInUser.complete_profile = true;

    res.status(200).send('Profile updated successfully!');
  }
  catch(error){
    console.error('Error completing profile:', error);
    res.status(500).send('Internal Server Error');
  }
};

const logout = (req, res) => {
  delete req.session.loggedInUser;
  req.session.save(function(err) {
    if (err) {
      console.error('Eroare la salvarea sesiunii:', err);
    } else {
      res.redirect('/');
    }
  });
};
  
module.exports = {
  getSpecializations,
  registerTeacher,
  registerTeacherPost,
  registerStudent,
  registerStudentPost,
  login,
  loginPost,
  googleLogin,
  googleCallback,
  completeProfile,
  completeProfileStudent,
  completeProfileStudentPut,
  completeProfileTeacher,
  completeProfileTeacherPut,
  logout
};