const db = require('./db');

const getAllCourses = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM courses', (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const getCourseById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM courses WHERE id = ?', [id], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

const addCourse = (course) => {
  const { title, price, duration, topics, description, drive_link } = course;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO courses (title, price, duration, topics, description, drive_link) VALUES (?, ?, ?, ?, ?, ?)',
      [title, price, duration, topics, description, drive_link],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      }
    );
  });
};

module.exports = { getAllCourses, getCourseById, addCourse };
