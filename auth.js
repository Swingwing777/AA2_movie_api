require('dotenv').config()

const jwtSecret = process.env.MY_SECRET;    // This must match passport.js file

const jwt = require('jsonwebtoken'),
  passport = require('passport');

  require('./passport');                // ie Local passport.js file in sibling directory

  let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
      subject: user.Username,          // This is the username to be encoded into the JWT
      expiresIn: '7d',                 // Token expires in 7 days
      algorithm: 'HS256'               // 256-bit encoding or "signing" for values of the JWT
    });
  }

/* POST login. */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        user.Password= ""  // This blanks the user password in the JSON response.
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}
