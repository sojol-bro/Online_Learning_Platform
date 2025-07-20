const db = require('./db');

const addReview = (user_id, course_id, rating, comment) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO comments (user_id, course_id, rating, comment, created_at) VALUES (?, ?, ?, ?, NOW())',
      [user_id, course_id, rating, comment],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      }
    );
  });
};

const getCourseReviews = (course_id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM comments WHERE course_id = ?', [course_id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = { addReview, getCourseReviews };