const mongoose = require('mongoose');
const fs = require('fs');
const csvParser = require('csv-parser');

// MongoDB connection string (replace with your actual connection string)
const mongoURI = 'mongodb+srv://g14healthsync:EHRepFOpmkE2pQ2q@healthsync-data.xjhzr.mongodb.net/HealthSync?retryWrites=true&w=majority&appName=HealthSync-data';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Mongoose schema and model
const PolicySchema = new mongoose.Schema({
    Brand_Name: String,
    Policy_Name: String,
    Cashless_Hospitals: Number,
    Coverage_Amount: Number,
    Monthly_Premium: Number,
    Annual_Premium: Number,
    Claim_Settlement_Ratio: Number,
});

const Policy = mongoose.model('Policy', PolicySchema);

// Function to read CSV and upload to MongoDB
const uploadCSVToMongoDB = (filePath) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', async () => {
      try {
        // Transform data if needed and insert into MongoDB
        const transformedData = results.map((row) => ({
          Brand_Name: row.Brand_Name,
          Policy_Name: row.Policy_Name,
          Cashless_Hospitals: parseInt(row.Cashless_Hospitals),
          Coverage_Amount: parseFloat(row.Coverage_Amount),
          Monthly_Premium: parseFloat(row.Monthly_Premium),
          Annual_Premium: parseFloat(row.Annual_Premium),
          Claim_Settlement_Ratio: parseFloat(row.Claim_Settlement_Ratio),
        }));

        await Policy.insertMany(transformedData);
        console.log('Data successfully uploaded to MongoDB');
        mongoose.connection.close();
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    });
};

// Replace with the path to your uploaded CSV file
const filePath = './cleaned_health_insurance_policies.csv';
uploadCSVToMongoDB(filePath);
