const mongoose = require('mongoose');
const Models = require('./models.js');        // ie same directory as index.js

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;
const Actors = Models.Actor;

mongoose.connect('mongodb://localhost:27017/bondMovieDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

app.use(morgan('common'));

app.use(express.static('public'));

// Welcome message
app.get('/', (req, res) => {
  res.status(200)
  res.send('Welcome to the James Bond 007 Movie Database');
});

// GET all movies as JSON
app.get('/movies/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find().populate('Genres', 'Name')
    .populate('Director', 'Name')
    .populate('BondActor', 'Name')
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET list of all movie titles
app.get('/movies/titles', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find({}, "Title")
    .then((movies) => {
      //will return only the titles
    res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET single Bond movie by Title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({Title: req.params.Title})
    .populate('Genres', 'Name')
    .populate('Director', 'Name')
    .populate('BondActor', 'Name')
    .then((movie) => {
    if (!movie) {
      return res.status(400).send('Movie with Title "' + req.params.Title + '" not found');
    } else {
      res.json(movie);
    }
  })
  .catch((error) => {                            // Final catch-all
    console.error (error);
    res.status(500).send('Error: ' + err);
  });
});

//GET genre information by name
app.get('/genre/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Genres.findOne( { Name: req.params.Name} )        // Promise
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET JSON of genres IDs for specific title
app.get('/movies/genres/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({Title: req.params.Title}).populate('Genres')  // Promise
  .then((movie) => {
    if (!movie) {
      return res.status(400).send('Title "' + req.params.Title + '" not found');
    } else {
      res.json(movie.Genres)
    }
  })
  .catch((err) => {                          // Final catch-all
    console.error (err);
    res.status(500).send('Error: ' + err);
  });
});

// GET all directors
app.get('/directors/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  Directors.find()               // Promise
    .then((directors) => {
      res.status(201).json(directors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET list of directors by name only
app.get('/directors/names', passport.authenticate('jwt', { session: false }), (req, res) => {
  Directors.find({}, "Name")               // Promise
    .then((directors) => {
      res.status(200).json(directors);     // Only Director names returned
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET director information for specific title
app.get('/movies/director/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne( { Title: req.params.Title} )        // Promise
    .then((movie) => {
      if (!movie) {
      return res.status(400).send('Title "' + req.params.Title + '" not found');
    } else {
      Directors.findById(movie.Director)
        .then((director) => {
          res.json(director);
        })
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
  });
});

// GET director information by name
app.get('/director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Directors.findOne( { Name: req.params.Name})        // Promise
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET list of Bonds by name only
app.get('/bonds/names', passport.authenticate('jwt', { session: false }), (req, res) => {
  Actors.find({}, 'Name')
    .then((actors) => {
      //will return only the titles
    res.status(200).json(actors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET list of Bonds by name only
app.get('/bonds/names', passport.authenticate('jwt', { session: false }), (req, res) => {
  Actors.find({}, "Name")               // Promise
    .then((actors) => {
      res.status(200).json(actors);     // Only Actor names returned
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET Bond actor information by name
app.get('/bond/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Actors.findOne( { Name: req.params.Name} )        // Promise
    .then((bond) => {
      res.json(bond);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET Bond Actor information for specific title
app.get('/movies/bond/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne( { Title: req.params.Title} )        // Promise
    .then((movie) => {
      if (!movie) {
      return res.status(400).send('Title "' + req.params.Title + '" not found');
    } else {
      Actors.findById(movie.BondActor)
        .then((bond) => {
          res.json(bond);
        })
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
  });
});

// GET list of all users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find().populate('FavoriteMovies', 'Title')                // Promise
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET list of all Usernames by JSON
app.get('/users/usernames', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find({}, 'Username')
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET single user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .populate('FavoriteMovies', 'Title')
  .then((user) => {
    if (!user) {
      return res.status(400).send('User with name "' + req.params.Username + '" not found');
    } else {
    res.json(user);
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Register new User - JSON Format expected
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })        // Does Username already exist?
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
            FavoriteMovies: []
          })
          .then((user) => {res.status(201).json(user)})
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
   .catch((error) => {
      console.error (error);
      res.status(500).send('Error: ' + error);
    });
});

// Add a movie by ID to a user's list of favorites
app.post('/users/:Username/:movieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({Username: req.params.Username})       // Promise
  .then((user) => {

    if (!user) {                               // Check user exists
      return res.status(400).send('User with name "' + req.params.Username + '" not found');

    } else {
      Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.movieID }
      },
      { new: true })                          // To return updated document
      .then ((updatedUser) => {
        res.json(updatedUser)
      })
      .catch((err) => {
        console.error (err);
        res.status(500).send('Error: ' + err);
      })
    }
  });
});

// Remove a movie by ID from a user's list of favorites (including any duplicates)
app.delete('/users/:Username/:movieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({Username: req.params.Username})             // Promise
  .then((user) => {

    if (!user) {                                    // Check user exists
      return res.status(400).send('User with name "' + req.params.Username + '" not found');

    } else {
      Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.movieID }
      },
      { new: true })                                // To return updated document
      .then ((updatedUser) => {
        res.json(updatedUser)
      })
      .catch((err) => {                             // Final catch-all
        console.error (err);
        res.status(500).send('Error: ' + err);
      })
    }
  });
});


// Update user by username - JSON format expected
/* {
  "Username": "String",
  "Password": "String",
  "Email": "String",
  "Birthday": "Date",
} */
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({Username: req.params.Username})       // Promise
  .then((user) => {
    if (!user) {
      return res.status(400).send('User with name "' + req.params.Username + '" not found');
    } else {
      Users.findOneAndUpdate({Username: req.params.Username}, { $set:
        {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        }
      },
      { new: true })
      .then ((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {                            // Final catch-all
        console.error (error);
        res.status(500).send('Error: ' + err);
      });
    }
  })
});

// DELETE user
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send('Username: "' + req.params.Username + '" was not found');
      } else {
        res.status(200).send('Username: "' + req.params.Username + '" was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Delete a user by Userid
app.delete('/ident/:UserID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findByIdAndRemove( req.params.UserID )
    .then((user) => {
      if (!user) {
        res.status(400).send('User with ID: ' + req.params.UserID + ' was not found');
      } else {
        res.status(200).send('User with ID: ' + req.params.UserID + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Application error catch-all
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Sorry, an error has been encountered');
});

//listen for requests
app.listen(8080, () => {
  console.log('The James Bond 007 database is listening on Port 8080.');
});
