const mongoose = require('mongoose');
const Models = require('./models.js');        // ie same directory as index.js

const BondMovies = Models.BondMovie;
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

app.use(morgan('common'));

app.use('/', express.static('public'));

// Welcome message
app.get('/', (req, res) => {
  res.status(200)
  res.send('Welcome to the James Bond 007 Movie Database');
});

//GET all Bond movies as JSON
/*app.get('/movies/all', (req, res) => {
  res.status(200)
  res.json(bondMovies);
});*/

//GET list of all movies
app.get('/movies/all', (req, res) => {
  BondMovies.find()               // Promise
    .then((bondMovies) => {
      res.status(201).json(bondMovies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET all Bond movies - title only by JSON
app.get('/movies/titles', (req, res) => {
  const listOfTitles = [];
  bondMovies.map(movie => {
    listOfTitles.push(movie.title);
  })
  res.status(200)
  res.json(listOfTitles);
});

//GET single Bond movie by title
app.get('/movies/:title', (req, res) => {
  let movie = bondMovies.find((movie) =>
    { return movie.title === req.params.title });

    if (movie) {
      res.status(200)
      res.json(bondMovies.find((movie) =>
        { return movie.title === req.params.title}));
    } else {
      res.status(404).send('Requested title "' + req.params.title + '" was not found.  Please try again.')
    }
  });

//GET genre information for specific title
app.get('/movies/genres/:title', (req, res) => {
  let movie = bondMovies.find((movie) =>
    { return movie.title === req.params.title});

  if (movie) {
    res.status(200).send('According to IMDB.com, ' + req.params.title + ' has been assigned the following genre or genres: ' + movie.genres + '.');
  } else {
    res.status(404).send('Requested title "' + req.params.title + '" was not found.  Please check Title and again.');
  }
});

//GET all directors
app.get('/movies/directors/all', (req, res) => {
  Directors.find()               // Promise
    .then((directors) => {
      res.status(201).json(directors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET director information for specific title
app.get('/movies/directors/:title', (req, res) => {
  let movie = bondMovies.find((movie) =>
    { return movie.title === req.params.title});

  if (movie) {
    res.status(200).send('The director of "' + req.params.title + '" is ' + movie.director.name + ', born on ' + movie.director.dob + ' in ' + movie.director.pob + '.');
  } else {
    res.status(404).send('Requested title "' + req.params.title + '" was not found.  Please try again.');
  }
});

//GET Bond information for specific title
app.get('/movies/bond/:title', (req, res) => {
  let movie = bondMovies.find((movie) =>
    { return movie.title === req.params.title});

  if (movie) {
    res.status(200).send('The actor playing James Bond, 007 in "' + req.params.title + '" is ' + movie.bond.name + ', born on ' + movie.bond.dob + ' in ' + movie.bond.pob + '.');
  } else {
    res.status(404).send('Requested title "' + req.params.title + '" was not found.  Please check details and try again.');
  }
});

//GET list of all users
app.get('/users', (req, res) => {
  Users.find()                       // Promise
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET all usernames by JSON
app.get('/users/usernames', (req, res) => {
  const listUsernames = [];
  users.map(user => {
    listUsernames.push(user.username);
  })
  res.status(200)
  res.json(listUsernames);
});

//GET single user by username
// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
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
app.post('/users/:Username/:BondMovieID', (req, res) => {
  Users.findOne({Username: req.params.Username})       // Promise
  .then((user) => {

    if (!user) {                               // Check user exists
      return res.status(400).send('User with name "' + req.params.Username + '" not found');

    } else {
      Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.BondMovieID }
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

// Remove a movie by ID from a user's list of favorites (inlcuding any duplicates)
app.delete('/users/:Username/:BondMovieID', (req, res) => {
  Users.findOne({Username: req.params.Username})             // Promise
  .then((user) => {

    if (!user) {                                    // Check user exists
      return res.status(400).send('User with name "' + req.params.Username + '" not found');

    } else {
      Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.BondMovieID }
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
app.put('/users/:Username', (req, res) => {
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
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Delete a user by UserID
app.delete('/users/:UserID', (req, res) => {
  Users.findOneAndRemove({ UserID: req.params.UserID })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.UserID + ' was not found');
      } else {
        res.status(200).send(req.params.UserID + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.use((err, req, res, next) => {                    // Application catch-all
  console.error(err.stack);
  res.status(500).send('Sorry, an error has been encountered');
});

//listen for requests
app.listen(8080, () => {
  console.log('The James Bond 007 database is listening on Port 8080.');
});
