// controllers/orderController.js
const Order = require('../models/order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, books } = req.body;
    const order = new Order({ user: userId, books });
    await order.save();
    res.redirect('/userpage');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating order.");
  }
};
