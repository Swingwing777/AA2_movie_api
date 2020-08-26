const express = require('express'),
 morgan = require('morgan');

const app = express();

let bondMovies = [
  {
    title: 'Dr. No',
    year: '1962',
    bond: 'Sean Connery',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Dr_No.jpg'
  },
  {
    title: 'From Russia With Love',
    year: '1963',
    bond: 'Sean Connery',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_From_Russia_With_Love.jpg'
  },
  {
    title: 'Goldfinger',
    year: '1964',
    bond: 'Sean Connery',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Goldfinger.jpg'
  },
  {
    title: 'Thunderball',
    year: '1965',
    bond: 'Sean Connery',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Thunderball.jpg'
  },
  {
    title: 'You Only Live Twice',
    year: '1967',
    bond: 'Sean Connery',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_You_Only_Live_Twice.jpg'
  },
  {
    title: 'Casino Royale (1967)',
    year: '1967',
    bond: 'Peter Sellers',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Casino_Royale_1967.jpg'
  },
  {
    title: 'On Her Majesty\'s Secret Service',
    year: '1969',
    bond: 'George Laxenby',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_OHMSS.jpg'
  },
  {
    title: 'Diamonds Are Forever',
    year: '1971',
    bond: 'Sean Connery',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Diamonds_Are_Forever.jpg'
  },
  {
    title: 'Live and let Die',
    year: '1973',
    bond: 'Roger Moore',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Live_And_Let_Die.jpg'
  },
  {
    title: 'The Man With the Golden Gun',
    year: '1974',
    bond: 'Roger Moore',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_The_Man_With_The_Golden_Gun.jpg'
  },
  {
    title: 'The Spy Who Loved me',
    year: '1977',
    bond: 'Roger Moore',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_The_Spy_Who_Loved_Me.jpg'
  },
  {
    title: 'Moonraker',
    year: '1979',
    bond: 'Roger Moore',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Moonraker.jpg'
  },
  {
    title: 'For Your Eyes Only',
    year: '1981',
    bond: 'Roger Moore',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_For_Your_Eyes_Only.jpg'
  },
  {
    title: 'Octopussy',
    year: '1983',
    bond: 'Roger Moore',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Octopussy.jpg'
  },
  {
    title: 'Never Say Never Again',
    year: '1983',
    bond: 'Sean Connery',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Never_Say_Never_Again.jpg'
  },
  {
    title: 'A View To A Kill',
    year: '1985',
    bond: 'Roger Moore',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/img/007_A_View_To_A_Kill.jpg'
  },
  {
    title: 'The Living Daylights',
    year: '1987',
    bond: 'Timothy Dalton',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_The Living Daylights.jpg'
  },
  {
    title: 'Licence to Kill',
    year: '1989',
    bond: 'Timothy Dalton',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Licence To Kill.jpg'
  },
  {
    title: 'GoldenEye',
    year: '1995',
    bond: 'Pierce Brosnan',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Goldeneye.jpg'
  },
  {
    title: 'Tomorrow Never Dies',
    year: '1997',
    bond: 'Pierce Brosnan',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Tomorrow_Never_Dies.jpg'
  },
  {
    title: 'The World Is Not Enough',
    year: '1999',
    bond: 'Pierce Brosnan',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_The_World_Is_Not_Enough.jpg'
  },
  {
    title: 'Die Another Day',
    year: '2002',
    bond: 'Pierce Brosnan',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Die_Another_Day.jpg'
  },
  {
    title: 'Casino Royale (2006)',
    year: '2006',
    bond: 'Daniel Craig',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Casino_Royale.jpg'
  },
  {
    title: 'Skyfall',
    year: '2012',
    bond: 'Daniel Craig',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Skyfall.jpg'
  },
  {
    title: 'Spectre',
    year: '2015',
    bond: 'Daniel Craig',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Spectre.jpg'
  },
];

app.use(morgan('common'));

app.use('/', express.static('public'));

// GET requests

app.get('/', (req, res) => {
  res.send('Welcome to the James Bond 007 Movie Database');
});

app.get('/movies', (req, res) => {
  res.json(bondMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Sorry, an error has been encountered');
});

//listen for requests
app.listen(8080, () => {
  console.log('The James Bond 007 database is listening on Port 8080.');
});
