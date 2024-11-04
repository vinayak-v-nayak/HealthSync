const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true }, // Ensure email is lowercase
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    job: { type: String, default: '' }, // Optional field
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' }, // Use enum for gender
    phone: { 
        type: String, 
        default: '' // Optional field
    },
    address: { type: String, default: '' } // Optional field
});

const User = mongoose.model('User', userSchema);
module.exports = User;
