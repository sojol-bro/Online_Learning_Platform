const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.submitReview);
router.get('/:course_id', reviewController.getReviews);

module.exports = router;