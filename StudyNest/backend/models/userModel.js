const db = require('./db');

const createUser = (name, email, hashedPassword, promocode) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users (name, email, password, promocode) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, promocode], (err, result) => {
      if (err) reject(err);
      else resolve(result.insertId);
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

module.exports = { createUser, findUserByEmail };
