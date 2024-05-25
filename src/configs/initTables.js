const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

  
bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);

    const SQLSTATEMENT = `
    DROP TABLE IF EXISTS User;
    
    CREATE TABLE User (
      user_id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(255),
      email VARCHAR(255),
      password TEXT NOT NULL,
      points INT
    );
    
    CREATE TABLE Test (
      question_id INT PRIMARY KEY AUTO_INCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      points INT
    );`

      pool.query(SQLSTATEMENT, (error, results, fields) => {
        if (error) {
          console.error("Error creating tables:", error);
        } else {
          console.log("Tables created successfully:");
        }
        process.exit();
      });
    
  }
});
