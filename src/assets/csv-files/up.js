const { MongoClient } = require('mongodb');
const csvtojson = require('csvtojson');
const fs = require('fs');

// MongoDB connection details
const uri = 'mongodb+srv://g14healthsync:EHRepFOpmkE2pQ2q@healthsync-data.xjhzr.mongodb.net/?retryWrites=true&w=majority&appName=HealthSync-data';  // Replace with your MongoDB connection string
const dbName = 'HealthSync';      // Replace with your database name
const collectionName = 'Policies'; // Replace with your collection name

// CSV file path
const csvFilePath = 'health_insurance_policies_string.csv';  // Path to your CSV file

// Function to upload CSV data to MongoDB
async function uploadCSVToMongoDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Read and convert CSV file to JSON
        const jsonArray = await csvtojson().fromFile(csvFilePath);
        
        // Insert JSON data into MongoDB collection
        await collection.insertMany(jsonArray);
        console.log('Data uploaded to MongoDB');
        
    } catch (error) {
        console.error('Error uploading data to MongoDB:', error);
    } finally {
        await client.close();
    }
}

// Start the upload process
uploadCSVToMongoDB();
