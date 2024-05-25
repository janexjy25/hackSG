//////////////////////////////////////////////////////
// REQUIRE BCRYPT MODULE
//////////////////////////////////////////////////////
const bcrypt = require("bcrypt");

//////////////////////////////////////////////////////
// SET SALT ROUNDS
//////////////////////////////////////////////////////
const saltRounds = 10;

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR COMPARING PASSWORD
//////////////////////////////////////////////////////
module.exports.comparePassword = (req, res, next) => {
  
  // Check password
  bcrypt.compare(req.body.password, res.locals.hash, (error, isMatch) => {
    if (error) {
      console.error("Error bcrypt:", error);
      res.status(500).send(error);
    } else {
      if (isMatch) {
        next();
      } else {
        res.status(401).send({
          message: "You entered an invalid email or password. Please try again.",
        });
      }
    }
  });
};


//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR HASHING PASSWORD
//////////////////////////////////////////////////////
module.exports.hashPassword = (req, res, next) => {

  var data;
  if (req.body.newPassword == undefined){
    data = req.body.password
  } else {
    data = req.body.newPassword
  }
    bcrypt.hash(data, saltRounds, (err, hash) => {
        if (err) {
          console.error("Error bcrypt:", err);
          res.status(500).json(err);
        } else {
          res.locals.hash = hash;
          next();
        }
      });

};
