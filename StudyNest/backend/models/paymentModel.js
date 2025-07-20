const db = require('./db');

const createPayment = (userId, courseId, method, trx_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO payments (user_id, course_id, method, trx_id, status) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [userId, courseId, method, trx_id, 'pending'], (err, result) => {
      if (err) reject(err);
      else resolve(result.insertId);
    });
  });
};

const getPaymentsByUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM payments WHERE user_id = ?', [userId], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const updatePaymentStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE payments SET status = ? WHERE id = ?', [status, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = { createPayment, getPaymentsByUser, updatePaymentStatus };
