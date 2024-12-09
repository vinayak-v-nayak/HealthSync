// models/Policy.js
const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    Brand_Name: String,
    Policy_Name: String,
    Cashless_Hospitals: Number,
    Coverage_Amount: Number,
    Monthly_Premium: Number,
    Annual_Premium: Number,
    Claim_Settlement_Ratio: Number,
    Policy_URL:String,
});

const Policy = mongoose.model('Policy', policySchema);
module.exports = Policy;
