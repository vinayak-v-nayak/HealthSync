// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  gender: String,
  age: Number,
  height: Number,
  weight: Number,
  heartRate: Number,
  diabetes: Boolean,
  bloodPressureProblems: Boolean,
  anyTransplants: Boolean,
  anyChronicDiseases: Boolean,
  knownAllergies: Boolean,
  historyOfCancerInFamily: Boolean,
  numberOfMajorSurgeries: Boolean,
  profileCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('UserData', userSchema);
