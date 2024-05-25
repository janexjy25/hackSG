const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

const userController = require('../controllers/userController');
const bcryptMW = require('../middlewares/bcryptMiddleware');
const jwtMW = require('../middlewares/jwtMiddleware');

// CA2 register endpoint
router.post('/register', userController.CheckDetails, bcryptMW.hashPassword, userController.createNewUser, jwtMW.generateToken, jwtMW.sendToken);

// CA2 login endpoint
router.post("/login", userController.login, bcryptMW.comparePassword, jwtMW.generateToken, jwtMW.sendToken);

module.exports = router;
