const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    username: 'haldw',
    password: '399699',
    email: 'info@sweepback.co.uk',
    dob: '01 Jan 2000',
    favorites: [
      'Spectre',
      'Goldfinger',
      'Thunderball'
    ]
  }
];

let bondMovies = [
  {
    title: 'Dr. No',
    year: '1962',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Terence Young',
      dob: '20 June 1915',
      pob: 'Shanghai, China',
      dod: '07 September 1994'
    },
    bond: {
      name:'Sean Connery',
      dob: '25 August 1930',
      pob: 'Edinburgh, Scotland',
      dod: '--'
    },
    plot: 'Bond searches for a missing colleague amid deliberate disruption of the American space program.',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Dr_No.jpg',
    songArtist: 'John Barry Orchestra'
  },
  {
    title: 'From Russia With Love',
    year: '1963',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Terence Young',
      dob: '20 June 1915',
      pob: 'Shanghai, China',
      dod: '07 September 1944'
    },
    bond: {
      name:'Sean Connery',
      dob: '25 August 1930',
      pob: 'Edinburgh, Scotland',
      dod: '--'
    },
    plotline: 'Bond goes in search of a Soviet decoding machine, needing to find it before the evil S.P.E.C.T.R.E organisation',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_From_Russia_With_Love.jpg',
    songArtist: 'Matt Monro'
  },
  {
    title: 'Goldfinger',
    year: '1964',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Guy Hamilton',
      dob: '16 September 1922',
      pob: 'Paris, France',
      dod: '20 April 2016'
    },
    bond: {
      name:'Sean Connery',
      dob: '25 August 1930',
      pob: 'Edinburgh, Scotland',
      dod: '--'
    },
    plotline: 'Auric Goldfinger has everything but the Fort Knox US Gold Reserve.  Now he wants that too.',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Goldfinger.jpg',
    songArtist: 'Shirley Bassey'
  },
  {
    title: 'Thunderball',
    year: '1965',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Terence Young',
      dob: '20 June 1915',
      pob: 'Shanghai, China',
      dod: '07 September 1944'
    },
    bond: {
      name:'Sean Connery',
      dob: '25 August 1930',
      pob: 'Edinburgh, Scotland',
      dod: '--'
    },
    plotline: 'Evidence leads Bond to the Bahamas in search of missing nuclear weapons.',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Thunderball.jpg',
    songArtist: 'Tom Jones'
  },
  {
    title: 'You Only Live Twice',
    year: '1967',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Lewis Gilbert',
      dob: '06 March 1920',
      pob: 'London, England',
      dod: '23 February 2018'
    },
    bond: {
      name:'Sean Connery',
      dob: '25 August 1930',
      pob: 'Edinburgh, Scotland',
      dod: '--'
    },
    plotline: 'Bond discovers the evil S.P.E.C.T.R.E is back, this time provoking war in space between the United States and Soviet Union',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_You_Only_Live_Twice.jpg',
    songArtist: 'Nancy Sinatra'
  },
  {
    title: 'Casino Royale (1967)',
    year: '1967',
    genres: [
      'Comedy',
    ],
    director: {
      name: 'Val Guest',
      dob: '11 December 1911',
      pob: 'Maida Vale, England',
      dod: '10 May 2006'
    },
    bond: {
      name:'Peter Sellers',
      dob: '08 September 1925',
      pob: 'Southsea, England',
      dod: '24 July 1980'
    },
    plotline: 'Bond spoof.  Evelyn Tremble (a.k.a James Bond 007) comes from retirement to tackle the evil S.M.E.R.S.H organisation',
    studio: 'Columbia Pictures',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Casino_Royale_1967.jpg',
    songArtist: 'Herb Alpert and the Tijuana Brass with Mike Redway'
  },
  {
    title: 'On Her Majesty\'s Secret Service',
    year: '1969',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Peter Hunt',
      dob: '11 March 1925',
      pob: 'London, England',
      dod: '14 August 2002'
    },
    bond: {
      name:'George Lazenby',
      dob: '05 September 1939',
      pob: 'Queanbeyan, Australia',
      dod: '--'
    },
    plotline: 'Bond investigates the true motives behind an allergy research centre in the Swiss Alps.',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_OHMSS.jpg',
    songArtist: 'John Barry Orchestra & Louis Armstrong'
  },
  {
    title: 'Diamonds Are Forever',
    year: '1971',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Guy Hamilton',
      dob: '16 September 1922',
      pob: 'Paris, France',
      dod: '20 April 2016'
    },
    bond: {
      name:'Sean Connery',
      dob: '25 August 1930',
      pob: 'Edinburgh, Scotland',
      dod: '--'
    },
    plotline: 'A diamond smuggling operation takes Bond to the lights and darkness of Las Vegas',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Diamonds_Are_Forever.jpg',
    songArtist: 'Shirley Bassey'
  },
  {
    title: 'Live and let Die',
    year: '1973',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Guy Hamilton',
      dob: '16 September 1922',
      pob: 'Paris, France',
      dod: '20 April 2016'
    },
    bond: {
      name:'Roger Moore',
      dob: '14 October 1927',
      pob: 'Stockwell, England',
      dod: '23 May 2017'
    },
    plotline: 'Heroin smuggling in the US southern bayou has Bond facing tarot cards and witch doctory',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Live_And_Let_Die.jpg',
    songArtist: 'Paul McCartney & Wings'
  },
  {
    title: 'The Man With the Golden Gun',
    year: '1974',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Guy Hamilton',
      dob: '16 September 1922',
      pob: 'Paris, France',
      dod: '20 April 2016'
    },
    bond: {
      name:'Roger Moore',
      dob: '14 October 1927',
      pob: 'Stockwell, England',
      dod: '23 May 2017'
    },
    plotline: 'Who is killing scientists?  And who is Francisco Scaramanga?',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_The_Man_With_The_Golden_Gun.jpg',
    songArtist: 'Lulu'
  },
  {
    title: 'The Spy Who Loved me',
    year: '1977',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Lewis Gilbert',
      dob: '06 March 1920',
      pob: 'London, England',
      dod: '23 February 2018'
    },
    bond: {
      name:'Roger Moore',
      dob: '14 October 1927',
      pob: 'Stockwell, England',
      dod: '23 May 2017'
    },
    plotline: 'Someone is hijacking nuclear submarines. Bond needs to stop them before the world goes to war.',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_The_Spy_Who_Loved_Me.jpg',
    songArtist: 'Carly Simon'
  },
  {
    title: 'Moonraker',
    year: '1979',
    genres: [
      'Action',
      'Adventure',
      'Sci-Fi'
    ],
    director: {
      name: 'Lewis Gilbert',
      dob: '06 March 1920',
      pob: 'London, England',
      dod: '23 February 2018'
    },
    bond: {
      name:'Roger Moore',
      dob: '14 October 1927',
      pob: 'Stockwell, England',
      dod: '23 May 2017'
    },
    plotline: 'Someone has stolen one of NASA\'s spaceshuttles. Bond needs to find out who.',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Moonraker.jpg',
    songArtist: 'Shirley Bassey'
  },
  {
    title: 'For Your Eyes Only',
    year: '1981',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'John Glen',
      dob: '15 May 1932',
      pob: 'Sunbury-on-Thames, England',
      dod: '--'
    },
    bond: {
      name:'Roger Moore',
      dob: '14 October 1927',
      pob: 'Stockwell, England',
      dod: '23 May 2017'
    },
    plotline: 'A missing Royal Navy intelligence vessel was equipped with a top secret weapons encryption device.  Bond needs to find it fast.',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_For_Your_Eyes_Only.jpg',
    songArtist: 'Sheena Easton'
  },
  {
    title: 'Octopussy',
    year: '1983',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'John Glen',
      dob: '15 May 1932',
      pob: 'Sunbury-on-Thames, England',
      dod: '--'
    },
    bond: {
      name:'Roger Moore',
      dob: '14 October 1927',
      pob: 'Stockwell, England',
      dod: '23 May 2017'
    },
    plotline: 'A fake Fabergé egg leads to a jewel smuggling operation and the mysterious Octopussy.',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Octopussy.jpg',
    songArtist: 'Rita Coolidge'
  },
  {
    title: 'Never Say Never Again',
    year: '1983',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Irvin Kershner',
      dob: '23 April 1929',
      pob: 'Philadelphia, USA',
      dod: '27 November 2010'
    },
    bond: {
      name:'Sean Connery',
      dob: '25 August 1930',
      pob: 'Edinburgh, Scotland',
      dod: '--'
    },
    plotline: 'Thunderball remake.  Someone has stolen two US nuclear weapons.',
    studio: 'Warner Bros',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Never_Say_Never_Again.jpg',
    songArtist: 'Lani Hall'
  },
  {
    title: 'A View To A Kill',
    year: '1985',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'John Glen',
      dob: '15 May 1932',
      pob: 'Sunbury-on-Thames, England',
      dod: '--'
    },
    bond: {
      name:'Roger Moore',
      dob: '14 October 1927',
      pob: 'Stockwell, England',
      dod: '23 May 2017'
    },
    plotline: 'Racehorses and microchips. A genius industrialist. Bond needs to find out what they all have in common.',
    studio: 'MGM/UA',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/img/007_A_View_To_A_Kill.jpg',
    songArtist: 'Duran Duran'
  },
  {
    title: 'The Living Daylights',
    year: '1987',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'John Glen',
      dob: '15 May 1932',
      pob: 'Sunbury-on-Thames, England',
      dod: '--'
    },
    bond: {
      name:'Timothy Dalton',
      dob: '21 March 1946',
      pob: 'Colwyn Bay, Wales',
      dod: '--'
    },
    plotline: 'Bond investigates a suspected KGB policy to hunt and kill enemy agents.',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_The Living Daylights.jpg',
    songArtist: 'a-ha'
  },
  {
    title: 'Licence to Kill',
    year: '1989',
    genres: [
      'Action',
      'Adventure',
      'Crime'
    ],
    director: {
      name: 'John Glen',
      dob: '15 May 1932',
      pob: 'Sunbury-on-Thames, England',
      dod: '--'
    },
    bond: {
      name:'Timothy Dalton',
      dob: '21 March 1946',
      pob: 'Colwyn Bay, Wales',
      dod: '--'
    },
    plotline: 'Bond\'s friend, Felix Leiter, is left for dead on his wedding day. Bond\'s investigation leads to straight to a drug lord.',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Licence To Kill.jpg',
    songArtist: 'Gladys Knight'
  },
  {
    title: 'GoldenEye',
    year: '1995',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Martin Campbell',
      dob: '24 October 1943',
      pob: 'Hastings, New Zealand',
      dod: '--'
    },
    bond: {
      name:'Pierce Brosnan',
      dob: '16 May 1953',
      pob: 'Drogheda, Ireland',
      dod: '--'
    },
    plotline: 'The theft of secret satellite technology leads Bond to a Russian crime syndicate, and a once friend he had watched die years earlier.',
    studio: 'United Artists',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Goldeneye.jpg',
    songArtist: 'Tina Turner'
  },
  {
    title: 'Tomorrow Never Dies',
    year: '1997',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Roger Spottiswoode',
      dob: '05 January 1945',
      pob: 'Ottawa, Canada',
      dod: '--'
    },
    bond: {
      name:'Pierce Brosnan',
      dob: '16 May 1953',
      pob: 'Drogheda, Ireland',
      dod: '--'
    },
    plotline: 'A media maganate foments war between China and the UK in the belief that ratings are everything.',
    studio: 'MGM/UA',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Tomorrow_Never_Dies.jpg',
    songArtist: 'Sheryl Crow'
  },
  {
    title: 'The World Is Not Enough',
    year: '1999',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Michael Apted',
      dob: '10 February 1941',
      pob: 'Aylesbury, England',
      dod: '--'
    },
    bond: {
      name:'Pierce Brosnan',
      dob: '16 May 1953',
      pob: 'Drogheda, Ireland',
      dod: '--'
    },
    plotline: 'Bond uncovers a nuclear plot whilst rescuing a former heiress from her kidnapper.',
    studio: 'MGM',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_The_World_Is_Not_Enough.jpg',
    songArtist: 'Garbage'
  },
  {
    title: 'Die Another Day',
    year: '2002',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Lee Tamahori',
      dob: '22 April 1950',
      pob: 'Wellington, New Zealand',
      dod: '--'
    },
    bond: {
      name:'Pierce Brosnan',
      dob: '16 May 1953',
      pob: 'Drogheda, Ireland',
      dod: '--'
    },
    plotline: 'Diamonds and a North Korean terrorist. Bond searches for the link to a new space weapon',
    studio: 'MGM',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Die_Another_Day.jpg',
    songArtist: 'Madonna'
  },
  {
    title: 'Casino Royale (2006)',
    year: '2006',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Martin Campbell',
      dob: '24 October 1943',
      pob: 'Hastings, New Zealand',
      dod: '--'
    },
    bond: {
      name:'Daniel Craig',
      dob: '02 March 1968',
      pob: 'Chester, England',
      dod: '--'
    },
    plotline: 'Based on the original Fleming Casino Royale, Bond must defeat a private banker in a agme of high stakes poker.',
    studio: 'Columbia Pictures',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Casino_Royale.jpg',
    songArtist: 'Chris Connell'
  },
  {
    title: 'Skyfall',
    year: '2012',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Sam Mendes',
      dob: '01 August 1965',
      pob: 'Reading, England',
      dod: '--'
    },
    bond: {
      name:'Daniel Craig',
      dob: '02 March 1968',
      pob: 'Chester, England',
      dod: '--'
    },
    plotline: 'Skeleton\'s in the closet. A secret from M\'s past.  What have they in common when M16 comes under direct attack?',
    studio: 'MGM/Columbia Pictures',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Skyfall.jpg',
    songArtist: 'Adele'
  },
  {
    title: 'Spectre',
    year: '2015',
    genres: [
      'Action',
      'Adventure',
      'Thriller'
    ],
    director: {
      name: 'Sam Mendes',
      dob: '01 August 1965',
      pob: 'Reading, England',
      dod: '--'
    },
    bond: {
      name:'Daniel Craig',
      dob: '02 March 1968',
      pob: 'Chester, England',
      dod: '--'
    },
    plotline: 'Bond is on the trail of a secret organisation called S.P.E.C.T.R.E.  How does it link to the awful events of the recent past?',
    studio: 'MGM/Columbia Pictures',
    posterURL: 'http://www.sweepback.co.uk/bondMovies/img/007_Spectre.jpg',
    songArtist: 'Sam Smith'
  },
];

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

// Register new user
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {                 // if NO user.name, then error msg
    const message = 'Missing Username in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();            // user allocated an ID
    newUser.favorites = [];            // user appended an empty favorites array
    users.push(newUser);               // user pushed to 'users' array
    res.status(201).send(newUser);     // new details sent as response
  }
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
