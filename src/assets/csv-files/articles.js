const mongoose = require('mongoose');
const fs = require('fs');

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

// Define Mongoose schema and model for articles
const ArticleSchema = new mongoose.Schema({
  source: {
    id: String,
    name: String,
  },
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String,
});

const Article = mongoose.model('Article', ArticleSchema);

// Function to upload JSON data to MongoDB
const uploadJSONToMongoDB = (filePath) => {
  fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    try {
      const articles = JSON.parse(data);
      await Article.insertMany(articles);
      console.log('Articles successfully uploaded to MongoDB');
      mongoose.connection.close();
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  });
};

// Replace with the path to your JSON file
const filePath = './news.json';
uploadJSONToMongoDB(filePath);
