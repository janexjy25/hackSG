const pool = require('../services/db');
const { selectAll } = require('./userModel');

// Checking if email exists
module.exports.checkEmail = (data, callback)=>{
    const SQLSTATMENT = "SELECT * FROM hack_db.user WHERE email = ?";
    const VALUES = [data.email];

    pool.query(SQLSTATMENT, VALUES,callback);
                    
}

// Checking if username exists
module.exports.checkUsername = (data, callback)=>{
    const SQLSTATMENT = "SELECT * FROM hack_db.user WHERE username = ?";
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES,callback);
                    
}

// Creating row for user's details and inserting info
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = 
    `
    INSERT INTO hack_db.user ( username, email, password) VALUES ( ?, ?, ?);
    `
    const VALUES = [data.username,data.email, data.password];

    pool.query(SQLSTATMENT, VALUES, callback);
}


// Getting ALL user's details
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT user.user_id, user.username
    FROM hack_db.user 
    `
    pool.query(SQLSTATMENT, callback);
}

// Getting user's details by ID
module.exports.selectUserByUsername = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT *
    FROM hack_db.user 
    WHERE username = ?
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// Getting user's HASHED password by ID
module.exports.selectPasswordByID = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT password, user_id
    FROM hack_db.user 
    WHERE user_id = ?
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


// Getting user 
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT *
    FROM hack_db.user 
    WHERE user_id= ?
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT *
    FROM hack_db.user 
    WHERE user_id= ?
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}



// Updating username
module.exports.updateUsernameById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE User 
    SET username = ?
    WHERE user_id = ?
    `;
    const VALUES = [data.username, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// Updating user email
module.exports.updateEmailById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE User 
    SET email = ?
    WHERE user_id = ?
    `;
    const VALUES = [data.email, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// Updating user password
module.exports.updatePasswordById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE User 
    SET password = ?
    WHERE user_id = ?
    `;
    const VALUES = [data.password, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


// Deleting user by ID
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = 
    `
    DELETE FROM User 
    WHERE user_id = ?;

    ALTER TABLE User AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

