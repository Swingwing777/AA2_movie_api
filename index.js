const mongoose = require('mongoose');
const Models = require('./models.js');        // ie same directory as index.js

const BondMovies = Models.BondMovie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;
const Actors = Models.Actor;

mongoose.connect('mongodb://localhost:27017/bondMovieDB', { useNewUrlParser: true, useUnifiedTopology: true });

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
app.get('/movies/all', (req, res) => {
  res.status(200)
  res.json(bondMovies);
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

//GET director information for specific title
app.get('/movies/director/:title', (req, res) => {
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
  res.status(200)
  res.json(users);
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
app.get('/users/:username', (req, res) => {
  let user = users.find((user) =>
    { return user.username === req.params.username });

    if (user) {
      res.status(200)
      res.json(users.find((user) =>
        { return user.username === req.params.username }));
    } else {
      res.status(404).send('Requested username "' + req.params.username + '" was not found.  Please try again.')
    }
  });

// Register new User
/* Expected JSON format
{
  "ID": "Integer",
  "Username": String,
  "Password": String,
  "Email": String,
  "Birthday": "Date",
  "FavoriteMovies": []
} */
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })        // Does Username already exist?
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
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

// Add user favorite (only if a valid user, valid title, and not already a favorite)
app.post('/users/:username/:title', (req, res) => {
  let user = users.find((user) =>                                 // Does user exist in database?
    { return user.username === req.params.username});

  if (user) {
    let movie = bondMovies.find((movie) =>                        // Does movie exist in database?
      { return movie.title === req.params.title});

    if (movie) {
      let pos = user.favorites.indexOf(req.params.title);         // Movie exists, but has it already been added to favorites?

        if (pos >= 0) {                                           // Already added - do not duplicate
          res.status(302).send(req.params.username + ' has already added title "' + req.params.title + '" to his/her/their favorites collection.  Duplicate not added.');
        } else {                                                  // Not already added
          user.favorites.push(movie.title);
          res.status(202).send(req.params.username + ' has added title "' + req.params.title + '" to his/her/their favorites collection.');
        }
    } else {                                                      // Movie does not exist in database
      res.status(404).send('Requested title "' + req.params.title + '" was not found.  Please check Title and try again.');
    }
  } else {                                                        // User does not exist in database
      res.status(404).send('Username ' + req.params.username + ' was not found. Please check Username and try again.');
  }
});

// Remove user favorite
app.delete('/users/:username/:title', (req, res) => {
  let user = users.find((user) =>
    { return user.username === req.params.username});

  if (user) {
    let movie = bondMovies.find((movie) =>                        // Does movie exist in database?
      { return movie.title === req.params.title});

    if (movie) {                                                  // If movie in database, does it exist in user favorites?
      let pos = user.favorites.indexOf(req.params.title);

        if (pos >= 0) {                                           // If movie in favorites, then remove
          let removedItem = user.favorites.splice(pos, 1);
          res.status(202).send(req.params.username + ' has removed title "' + req.params.title + '" from his/her/their favorites collection.');

        } else {                                                  // If movie not in favorites
          res.status(302).send(req.params.username + ' does not have title "' + req.params.title + '" in his/her/their favorites collection.');
        }
    } else {                                                      // Movie not in database
      res.status(404).send('Title "' + req.params.title + '" was not found.  Please check Title and try again.');
    }
  } else {                                                        // User not in database
    res.status(404).send('Username ' + req.params.username + ' was not found. Please check Username and try again.');
  }
});

// DELETE user
app.delete('/users/:username', (req, res) => {
  let user = users.find((user) =>
    { return user.username === req.params.username });

  if (user) {       // if student exists
    users = users.filter((obj) => { return obj.username !== req.params.username });
    res.status(201).send('Username "' + req.params.username + '" has been deleted from the database.');
  } else {
    res.status(404).send('Username ' + req.params.username + ' does not exist.  Please recheck Username to be deleted and try again.');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Sorry, an error has been encountered');
});

//listen for requests
app.listen(8080, () => {
  console.log('The James Bond 007 database is listening on Port 8080.');
});
