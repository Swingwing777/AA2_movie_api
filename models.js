const mongoose = require('mongoose');

let bondMovieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Year: Date,
  Genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
  Description: {type: String, required: true},
  Director: {type: mongoose.Schema.Types.ObjectId, ref: 'Director'},
  BondActor: {type: mongoose.Schema.Types.ObjectId, ref: 'Actor'},
  Heroine: {type: String, required: true},
  Villain: {type: String, required: true},
  Actors: [String],
  ImagePath: String,
  SongArtist: String,
  Featured: Boolean
});

let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavouriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BondMovie'}]
});

let genreSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Description: {type: String, required: true},
});

let directorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String, required: true},
  Birth: {
    Date: Date,
    Place: {type: String, required: true}
  },
  Death: {
    Date: Date,
    Place: String
  },
  KnownFor: [String]
});

let actorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String, required: true},
  Birth: {
    Date: Date,
    Place: {type: String, required: true}
  },
  Death: {
    Date: Date,
    Place: String
  },
  KnownFor: [String]
});

let BondMovie = mongoose.model('BondMovie', bondMovieSchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);
let Actor = mongoose.model('Actor', actorSchema);

module.exports.BondMovie = BondMovie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
module.exports.Actor = Actor;
