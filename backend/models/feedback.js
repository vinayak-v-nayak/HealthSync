const mongoose = require('mongoose');

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  feedback: { type: String, required: true },
  rating: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
  
const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
