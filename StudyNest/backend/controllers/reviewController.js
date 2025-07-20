const Review = require('../models/reviewModel');

exports.submitReview = async (req, res) => {
  const { user_id, course_id, rating, comment } = req.body;
  try {
    const reviewId = await Review.addReview(user_id, course_id, rating, comment);
    res.status(201).json({ message: 'Review submitted', reviewId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.getCourseReviews(req.params.course_id);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};