const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  gender: String,
  age: Number,
  height: Number,
  weight: Number,
  salary:Number,
  diabetes: Boolean,
  bloodPressureProblems: Boolean,
  anyTransplants: Boolean,
  anyChronicDiseases: Boolean,
  knownAllergies: Boolean,
  historyOfCancerInFamily: Boolean,
  numberOfMajorSurgeries: Number,
  fitnessScore: { type: Number, default: 0 }, 
  profileCompleted: { type: Boolean, default: false },
  
});

module.exports = mongoose.model('UserData', userSchema);
