import React, { useEffect, useState } from 'react';
import '../assets/css/blog.css'; // Import the CSS file

const InsuranceServices = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiKey = '6cf8f68cbb2249ca8870d9d8a2d3de23'; // Replace with your News API key
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=insurance+policy&apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to load news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        {error}
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="heading">
        Latest Insurance Policy News
      </h1>

      <div className="articles-container">
        {articles.map((article, index) => (
          <div 
            key={index}
            className="article-card"
          >
            <h3 className="article-title">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h3>
            <p className="article-description">
              {article.description}
            </p>
            <p className="article-source">
              Source: {article.source.name} - Published on: {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {articles.length === 0 && !loading && !error && (
        <div className="no-articles-message">
          No news articles available at the moment.
        </div>
      )}
    </div>
  );
};

export default InsuranceServices;
