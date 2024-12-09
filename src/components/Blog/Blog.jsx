import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "./blog.css"; // Import the CSS file
const baseUrl = process.env.REACT_APP_API_URL;

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0); // Track current slide in carousel

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${baseUrl}/api/articles`); // MongoDB API endpoint

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Filter articles that have a urlToImage (like in the previous code)
        const articlesWithPhotos = data.filter((article) => article.urlToImage);
        setArticles(articlesWithPhotos);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Continuous Carousel Rotation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide + 1 === Math.min(4, articles.length) ? 0 : prevSlide + 1
      );
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [articles]);

  if (loading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} spin /> Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
      </div>
    );
  }

  const featuredArticles = articles.slice(0, 4); // Top 4 articles for carousel
  const otherArticles = articles.slice(4); // Remaining articles for the grid

  return (
    <div className="page-container">
      <h1 className="heading">Latest Insurance Policy News</h1>

      {/* Featured Articles Carousel */}
      <div className="carousel">
        {featuredArticles.map((article, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
          >
            <img
              src={article.urlToImage}
              alt={article.title}
              className="carousel-image"
            />
            <div className="carousel-caption">
              <h2>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="carousel-title"
                >
                  {article.title}
                </a>
              </h2>
              <p>{article.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Other News Articles */}
      <div className="articles-container">
        {otherArticles.map((article, index) => (
          <div key={index} className="article-card">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="article-image"
            />
            <h3 className="article-title">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h3>
            <p className="article-description">{article.description}</p>
            <p className="article-source">
              Source: {article.source.name} - Published on:{" "}
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
