const mongoose = require('mongoose');

const fitnessScoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming the User model is named 'User'
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  weight: {
    type: Number,
    required: true,
    min: 0
  },
  height: {
    type: Number,
    required: true,
    min: 0
  },
  exerciseMinutes: {
    type: Number,
    required: true,
    min: 0
  },
  heartRate: {
    type: Number,
    required: true,
    min: 0
  },
  stepsPerDay: {
    type: Number,
    required: true,
    min: 0
  },
  fitnessScore: {
    type: Number,
    required: true
  },
 
});

module.exports = mongoose.model('FitnessScore', fitnessScoreSchema);
