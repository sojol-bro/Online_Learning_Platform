const Course = require('../models/courseModel');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.getAllCourses();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await Course.getCourseById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const newCourseId = await Course.addCourse(req.body);
    res.status(201).json({ message: 'Course added', id: newCourseId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
