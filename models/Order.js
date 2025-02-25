// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  books:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  orderDate: { type: Date, default: Date.now },
  status:    { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Order', orderSchema);
