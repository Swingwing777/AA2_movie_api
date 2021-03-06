const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  Genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
  Description: { type: String, required: true },
  Director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director' },
  BondActor: { type: mongoose.Schema.Types.ObjectId, ref: 'Actor' },
  Heroine: { type: String, required: true },
  Villain: { type: String, required: true },
  Actors: [String],
  ImagePath: String,
  ThumbNail: String,
  SongArtist: String,
  Featured: Boolean
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

/**
 * ##### Purpose:
 * - To hash user password.
 * @function hashPassword
 * @param {*} password 
 * @returns {string} hashed password
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * ##### Purpose: 
 * - To validate user passowrd.
 * @function
 * @param {*} password 
 */
userSchema.methods.validatePassword = function (password) {  // Do not use arrow funciton for 'instance methods'
  return bcrypt.compareSync(password, this.Password);
};

let genreSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
});

let directorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String, required: true },
  Birth: {
    Date: Date,
    Place: String    // Cannot be required due to Casino Royale(1967) multiple directors
  },
  Death: {
    Date: Date,
    Place: String
  },
  KnownFor: [String]
});

let actorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String, required: true },
  Birth: {
    Date: Date,
    Place: { type: String, required: true }
  },
  Death: {
    Date: Date,
    Place: String
  },
  KnownFor: [String]
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);
let Actor = mongoose.model('Actor', actorSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
module.exports.Actor = Actor;
