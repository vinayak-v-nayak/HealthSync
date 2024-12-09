const mongoose = require('mongoose');

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
  module.exports = Article;
