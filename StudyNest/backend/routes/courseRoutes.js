const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Public
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourse);

// Admin
router.post('/', courseController.addCourse);

module.exports = router;
