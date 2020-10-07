const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

require('dotenv').config()  // For local testing with environment vars- not needed for Heroku

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
  usernameField: 'Username',
  passwordField: 'Password'
}, (username, password, callback) => {
  console.log(username + '  ' + password);
  Users.findOne({ Username: username }, (error, user) => {
    if (error) {
      console.log(error);
      return callback(error);
    }

    if (!user) {
      console.log('incorrect username');
      return callback(null, false, { message: 'Incorrect username.' });
    }

    if (!user.validatePassword(password)) {
      console.log('incorrect password');
      return callback(null, false, { message: 'Incorrect password.' });
    }

    console.log('Login Successful');
    return callback(null, user);
  });
}));

console.log("secret: ", process.env.MY_SECRET);
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.MY_SECRET
}, (jwtPayload, callback) => {
  return Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      console.log(error)
      return callback(error)
    });
}));
