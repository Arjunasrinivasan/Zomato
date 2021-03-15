const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('orders', orderSchema, 'orders');