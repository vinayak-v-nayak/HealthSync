// db.js
const mongoose = require('mongoose');

const uri = "mongodb+srv://g14healthsync:EHRepFOpmkE2pQ2q@healthsync-data.xjhzr.mongodb.net/HealthSync?retryWrites=true&w=majority&appName=HealthSync-data"; // Replace with your MongoDB URI

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
