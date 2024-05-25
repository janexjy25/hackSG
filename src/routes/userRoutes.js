const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const jwtMW = require('../middlewares/jwtMiddleware');

//=================== Table of contents ===================
// 1. GET /users (Get all players)
// 2.  GET /users/{user_id}
// 3. PUT /users/username (Edit username)
// 4. PUT /users/email - Edit email
// 5. DELETE /users/{user_id}
// 6. Advanced feature - Checking out item, followed by deleting what has been checked out from cart
// 7. CA2 GET users/forest - get player's inventory

router.get('/userID', jwtMW.verifyToken, userController.getUserByID);
router.put('/username', jwtMW.verifyToken, userController.checkUsername, userController.updateUsername, userController.getUserByID);
router.put('/email', jwtMW.verifyToken, userController.checkEmail, userController.updateEmail, userController.getUserByID);
router.delete('/:user_id',  userController.deleteUserById);

module.exports = router;