// Name: Charlene Yeo Jia Qi
// Admin number: p2317579
// Class: DAAA/FT/1B/05

const model = require("../models/userModel.js");

// Checking if email already exists
module.exports.checkEmail = (req, res, next) => {

    // Checking for missing data from request body
    if (req.body.email == undefined) {
        res.status(400).send({
            "error message": "missing email"
        });
        return;
    }

    const data = {
        role: req.body.role,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    // Checking if email exists 
    model.checkEmail(data, (error, results) => {
        if (error) {
            console.error("Error:", error);
            res.status(500).send(error);
        } else {
            // Email exists in database already
            if (results.length) {
                res.status(409).send({
                    message: "email already exists"
                });
                return;
            } else {
                res.locals.user_id
                next();
            }
        }
    });
};

// Checking if username exists
module.exports.checkUsername = (req, res, next) => {

    // Checking for missing data from request body
    if (req.body.username == undefined) {
        res.status(400).send({
            "error message": "missing username"
        });
        return;
    }

    const data = {
        role: req.body.role,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    // Checking if email exists 
    model.checkUsername(data, (error, results) => {
        if (error) {
            console.error("Error:", error);
            res.status(500).send(error);
        } else {
            // Email exists in database already
            if (results.length) {
                res.status(409).send({
                    message: "username already exists"
                });
                return;
            } else {
                res.locals.user_id;
                next();
            }
        }
    });
};

// POST /users
module.exports.createNewUser = (req, res, next) => {

    const data = {
        role: req.body.role,
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    };

    // Inserting user's details into database
    model.insertSingle(data, (error, results) => {
        if (error) {
            console.error("Error :", error);
            res.status(500).send(error);
        } else {
            if (results.affectedRows == 1) {
                const userData = {
                    user_id: results.insertId,
                    total_points: 0
                };
            }
        }
    });
};

// CA2 Endpoint: POST /login
module.exports.login = (req, res, next) => {
    if (req.body.username == undefined || req.body.password == undefined) {
      res.status(400).send({
        message: "username or password is undefined",
      });
      return;
    }
  
    const data = {
      username: req.body.username
    };

    model.selectUserByUsername(data, (error, results, fields) => {
        if (error) {
          console.error("Error login:", error);
          res.status(500).json(error);
        } else {
          if (results.length == 0) {
            res.status(404).send({
              message: "You entered an invalid email or password. Please try again.",
            });
          } else {
            res.locals.user_id = results[0].user_id;
            res.locals.role = results[0].role;
            res.locals.username = results[0].username;
            res.locals.hash = results[0].password;
            res.locals.message = "User " + res.locals.username + " logged in successfully.";
            next();
          }
        }
      });
  };

// GET /users
module.exports.getAllUsers = (req, res, next) => {

// Getting all infor of all user's details
    model.selectAll((error, results, fields) => {
        if (error) {
            console.error("Error:", error);
            res.status(500).send(error);
            return;
        }

        if (results === null) {
            res.status(204).send();
            return;
        }

        res.status(200).send(results);
        }); 
};

// GET /users/{user_id}
module.exports.getUserByID = (req, res, next) => {
    let data;
    if (res.locals.user_id !== undefined) {
        data = {
            user_id: res.locals.user_id
        };
    } else {
        data = {
            user_id: req.params.user_id
        };
    }

    // Getting user's info by ID
    model.selectById(data, (error, results) => {
        if (error) {
            console.error("Error:", error);
            res.status(500).send(error);
        } else {
            // No user found
            if (results.length === 0) {
                res.status(404).send({
                    message: "User not found"
                });
            } else {
                res.locals.user_id = res.locals.user_id;
                res.locals.username = results[0].username;
                res.locals.email = results[0].email;
               next()
            }
        }
    });
};

module.exports.CheckDetails = (req, res, next) =>
{
    const data = {
        user_id: req.params.user_id,
        username: req.body.username,
        email: req.body.email
    }

    model.checkEmail(data, (error, results)=>{
        if(error){
            console.error("Error:", error);
            res.status(500).send(error);
        } else {
            // Email already exists
            if (results.length){
                res.status(422).send({
                    error_message: "email already exists"
                });
                return;
            } else {
                // Checking username
                model.checkUsername(data, (error, results) => {
                    if (error) {
                        console.error("Error checkEmail:", error);
                        res.status(500).send(error);
                    } else {
                    // Email already exists
                    if (results.length){
                        res.status(409).send({
                        error_message: "username already exists"
                        });
                        return;
                    } else {
                        next();
                    }
                    }
                });
            }
        }
    });
}

// PUT/users/{user_id}
module.exports.updateUsername = (req, res, next) =>
{
    const data = {
        user_id: res.locals.user_id,
        username: req.body.username
    }

    model.updateUsernameById(data, (error, results) => {
        if (error) {
            console.error("Error updateUsernameById:", error);
            res.status(500).send(error);
        } else {
            // No user found
            if(results.affectedRows == 0) 
            {
                res.status(404).send({
                    message: "User not found"
                });
            }
            else{
                res.locals.user_id = res.locals.user_id
                next();
            }
        }
    });
    
}

// PUT/users/{user_id}
module.exports.updateEmail = (req, res, next) =>
{
    const data = {
        user_id: res.locals.user_id,
        email: req.body.email
    }

    model.updateEmailById(data, (error, results) => {
        if (error) {
            console.error("Error updateEmailById:", error);
            res.status(500).send(error);
        } else {
            // No user found
            if(results.affectedRows == 0) 
            {
                res.status(404).send({
                    message: "User not found"
                });
            }
            else{
                res.locals.user_id
                next();
            }
        }
    });   
}

// PUT /changePassword/{user_id}
module.exports.updatePassword = (req, res, next) =>
{
    const data = {
        user_id: res.locals.user_id,
        password: res.locals.hash
    }

    model.updatePasswordById(data, (error, results) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).send(error);
        } else {
            // No user found
            if(results.affectedRows == 0) 
            {
                res.status(404).send({
                    message: "User not found"
                });
            }
            else{
                res.status(200).send({
                    message: "Password successfully updated!"
                });
            }
        }
    });
}

// DELETE /users/{user_id}
module.exports.deleteUserById = (req, res, next) =>
{
    const data = {
        user_id: req.params.user_id
    }

    // Deleting user
    model.deleteById(data, (error, results) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).send(error);
        } else {
            // No user found
            if(results.affectedRows == 0) 
            {
                res.status(404).send({
                    message: "User not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    });
}

