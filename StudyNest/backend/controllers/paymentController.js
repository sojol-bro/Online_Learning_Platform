const Payment = require('../models/paymentModel');

exports.makePayment = async (req, res) => {
  const { user_id, course_id, method, trx_id } = req.body;
  try {
    const paymentId = await Payment.createPayment(user_id, course_id, method, trx_id);
    res.status(201).json({ message: 'Payment submitted', id: paymentId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserPayments = async (req, res) => {
  const userId = req.params.userId;
  try {
    const payments = await Payment.getPaymentsByUser(userId);
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
