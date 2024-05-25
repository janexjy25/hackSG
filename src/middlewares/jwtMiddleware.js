// REQUIRE DOTENV MODULE
require("dotenv").config();

// REQUIRE JWT MODULE
const jwt = require("jsonwebtoken");

// SET JWT CONFIGURATION
const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;

// MIDDLEWARE FUNCTION FOR GENERATING JWT TOKEN
module.exports.generateToken = (req, res, next) => {
    const payload = {
      user_id: res.locals.user_id,
      role: res.locals.role,
      username: res.locals.username,
      timestamp: new Date()
    };
  
    const options = {
      algorithm: tokenAlgorithm,
      expiresIn: tokenDuration,
    };
  
    jwt.sign(payload, secretKey, options, (error, token) => {
      if (error) {
        console.error("Error jwt:", error);
        res.status(500).json(error);
      } else {
        res.locals.token = token;
        console.log(token)
        next();
      }
    });
  
  };
  
//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR SENDING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.sendToken = (req, res, next) => {
    res.status(200).send({
        user_id: res.locals.user_id,
        username: res.locals.username,
        role: res.locals.role,
        message: res.locals.message,
        token: res.locals.token
      });
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR VERIFYING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ 
        error: 'No token provided'
      });
    }
  
    const token = authHeader.substring(7);
  
    if (!token) {
      return res.status(401).send({
        error: "No token provided"
      });
    }
    
    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
          console.log(error)
          return res.status(401).send({
             error: "Invalid token" 
            });
            
        } else {
          res.locals.user_id = decoded.user_id;
          res.locals.role = decoded.role;
          res.locals.username = decoded.username;
          res.locals.tokenTimestamp = decoded.timestamp;
          next();
        }
      });
};
