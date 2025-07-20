const Payment = require('../models/paymentModel');
const User = require('../models/userModel');
const Course = require('../models/courseModel');

exports.getDashboard = async (req, res) => {
  try {
    const [users, payments, courses] = await Promise.all([
      User.getAllUsers(),
      Payment.getPayments(),
      Course.getAllCourses()
    ]);
    res.json({ users, payments, courses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};