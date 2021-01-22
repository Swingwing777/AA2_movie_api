# Bond Movie Database 

An end-to-end project involving a MongoDB non-relational database built in the Node.js runtime environment using the Express framework, combined with a React framework single page application as the frontend. Better known as the MERN stack.

The user can register, login and look up a selection of information regarding every James Bond movie released to the present date. The user can also add to and remove favorites from their personal profile.

![Bond_movies_Database(450).png](http://sweepback.co.uk/supportfiles/Readme%20Support%20Media%20-%20for%20Sweepback/Bond_Movies_Database%28450%29.png)

### Tech:

The Bond Movie Database uses the following technologies to work:

* [MongoDB] - A document database, to store data in JSON-like documents.
* [Express] - Fast, unopinionated, minimalist web framework for Node.js.
* [Node.js] - A JavaScript runtime environment built on Chrome's V8 JavaScript engine.
* [Mongoose] - An elegant mongodb object modeling for node.js.
* [Passport] - Simple, unobtrusive authentication for Node.js.
* [React] - A JavaScript library for building user interfaces.
* [React Router] - A collection of navigational components that compose declaratively in-app.
* [React-Router-Dom] - DOM bindings for React Router. 
* [Axios] - Promise based HTTP client for the browser and node.js.
* [npm] - Package Manager.
* [React-Bootstrap] - Bootstrap for React.
* [Redux] - A Predictable State Container for JS Apps.
* [Parcel] - A zero configuration web application bundler.
* [Dillinger] - The Last Markdown Editor ever.
* [Heroku] Hosting.
* And of course the Bond-Movie Database itself is open source on [GitHub].
----
### Installation:

> Note: The following steps are for Windows using Windows Sub-system Linux 2 (WSL2).

The Bond Movie Database backend requires [Node.js](https://nodejs.org/) v14+ to build.

Install the latest LTS version of Node.js.
```sh
$ nvm install lts/*
```
Using nvm also installs npm.  If copying the full directory set from GitHub, use `npm` to install all dependencies listed in the `package.json`, including the [Express] package:
```sh
$ npm install
```
## Server Side:
### Database Installation:

A NoSQL database was created and tested in WSL2 using a packaged `mongodb` included with Ubuntu for Windows.  As it is not supported by [mongoDB], developers may instead wish to use supported GUI-based alternatives right from the start such as [mongoDB Compass].  MacOS users should not face this inconvenience.

> Caution: Some difficulties were experienced using `mongodb` within Windows Sub-system Linux Version 1, in particular the `mongod` server.  Updating WSL to Version 2 cured these issues.  Refer to [Microsoft] for further information on updating the WSL kernal.

##### - Windows:
To install `mongodb` in the root directory of WSL2:
```sh
$ cd ~
$ sudo apt install mongodb
```
Notes: 
> For local database use, a `mongodb account is not needed.  However, if using [MongoDB Compass], a free account will be needed.

##### - MacOS:
Install the [Homebrew] package manager for MacOS in accordance with Homebrew installation instructions. If already installed, update via the MacOS terminal:
```sh
$ brew update.
```
If uncertain whether installed or not, type:
```sh
$ brew doctor
```
If anything **other than** `command not found` is returned, Homebrew is installed.

Once Homebrew has finished installing or updating, typ the following to install the MongoDB custom "tap" followed by the latest verison of `mongoDB`:
```sh
$ brew tap mongodb/brew
$ brew install mongodb-community
```

### Database Creation:
Once mongodb is installed on the chosen OS, type the following to start the `mongodb` server:
```sh
$ mongod
```
Then open a second bash window and start the `mongo` shell:
```sh
$ mongo
```
`CTRL + C` in the first bash window stops the `mongod` server.  `quit()` in the second bash window quits the `mongodb` shell.

Now create or manage your database in accordance with `mongodb` instructions and syntax.

### Database Hosting:
The database is hosted online through [MongoDB Atlas], with data managed via the [mongoDB Compass] GUI.  
Within [MongoDB Atlas]:
1. Go to **Data Storage** --> **Clusters** --> **Create a New Cluster** to create an Atlas cluster.
2. Go to **Security** --> **Database Access** --> **ADD NEW DATABASE USER** to add a database user (ie you, the developer).
2. Go to **Network Access** --> **ADD IP ADDRESS** to whitelist your local device. 
3. Go to **Clusters** --> **...** --> **Command Line Tools** --> **Data Import and Export Tools**
4. Next, with the `mongod` server running in a separate bash window, follow the instructions detailed under **mongoimport** to create a text command that can be copy/pasted into a new bash window:
```sh
mongoimport --uri mongodb+srv://username:<PASSWORD>@clustername.febfz.mongodb.net/<DATABASE> --collection <COLLECTION> --type <FILETYPE> --file <FILENAME>
```
This will upload your collection (or collections if repeated for each).
```sh
user@myPC-i9:~$ 
mongoimport --uri mongodb+srv://username:password@clustername.febfz.mongodb.net/bondMovieDB --collection movies --type json --file ./databackup/movies.json 
mongoimport --uri mongodb+srv://username:password@clustername.febfz.mongodb.net/bondMovieDB --collection actors --type json --file ./databackup/actors.json
```
Thereafter, with the your PC or Mac authorized to communicate with the online database (ie whitelisted), regular MongoDB commands (eg db.movies.find() ) can be run on the online collections from bash **without needing** to run mongod in the background.

### Database Connection to Heroku:
Connection of the databas to the eventual app hosting site – in this case [Heroku] – can be completed by following the instructions again found at [MongoDB Atlas]:
1. Go to **Clusters** --> **Connect** --> **Connect your application**.  
2. Add the provided string URI to the `mongoose.connect()` method found in the project root `index.js` file.  Note: This can and should be replaced eventually by a `process.env` variable within Heroku's dashboard settings for security.

## Client Side:
The client side app has been created from scratch using [React] and built using [Parcel]:
```sh
parcel build client/src/index.html
```
[React-Bootstrap] is the underlying library and [React-Router-Dom] provides the inter-view navigation.
[Redux] is incorporated – see `client/src/actions/actions.js` and `client/src/reducers/reducer.js` – to leverage the benefits of Flux and separate structural code from component state.

### Authentication:
Server-side authentication includes:
* Basic HTTP authentication for logging in users:
and
* JWT-based authentication for all subsequent requests against the API endpoints.
> Note: For individual security, all passwords are hashed.

Client-side participation in these processes uses local storage to store the JWT for authenticated users, to be sent alongside each server request.

### Client-side Hosting:
The client-side is hosted on Heroku alongside the server-side, removing any need for (or complications arising from) Cross Origin Resourse Sharing.  CORS logic remains commented out rather than removed from the root `index.js` file to allow for separate hosting of front and back end, as may occur during local testing.

----
License 
----

##### DWhal
* Email via GitHub.
* [GitHub]
* [LinkedIn]
* [Twitter]

    [mongoDB]: <https://www.mongodb.com/2>
    [mongoDB Compass]: <https://www.mongodb.com/products/compass>
    [MongoDB Atlas]: <https://cloud.mongodb.com/>
    [Express]: <http://expressjs.com/>
    [Homebrew]: <https://brew.sh/>
    [Node.js]: <https://nodejs.org/en/>
    [Mongoose]: <https://mongoosejs.com/>
    [Passport]: <http://www.passportjs.org/>
    [Microsoft]: <https://docs.microsoft.com/en-gb/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package>
    [React]: <https://reactjs.org/>
    [React Router]: <https://reactrouter.com/>
    [React-Router-Dom]: <https://www.npmjs.com/package/react-router-dom>
    [Axios]: <https://www.npmjs.com/package/axios>
    [npm]: <https://www.npmjs.com/>
    [React-Bootstrap]: <https://react-bootstrap.github.io/>
    [Redux]: <https://redux.js.org/>
    [Parcel]: <https://parceljs.org/>
    [Dillinger]: <https://github.com/joemccann/dillinger>
    [Heroku]: <https://www.heroku.com/home>
   [GitHub]: <https://github.com/Swingwing777/AA2_movie_api>
   [LinkedIn]: <linkedin.com/in/david-hales-3450305a>
   [Twitter]: <https://twitter.com/dwhal>