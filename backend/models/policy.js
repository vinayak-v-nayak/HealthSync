// models/Policy.js
const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    Brand_Name: String,
    Policy_Name: String,
    Cashless_Hospitals: String,
    Coverage_Amount: String,
    Monthly_Premium: String,
    Annual_Premium: String,
    Claim_Settlement_Ratio: String
});

const Policy = mongoose.model('Policy', policySchema,'Policies');
module.exports = Policy;
