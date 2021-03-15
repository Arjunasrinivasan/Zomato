const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;

// Register the Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
});

// Export the model
module.exports = mongoose.model('User', UserSchema);