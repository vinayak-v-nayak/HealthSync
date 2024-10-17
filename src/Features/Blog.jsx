import React from "react";
import "../assets/css/blog.css";

const blogs = [
  {
    title: "Understanding Different Types of Health Insurance Plans",
    date: "October 16, 2024",
    content:
      "Choosing the right health insurance plan can be overwhelming. With so many options available, it’s important to understand the differences between each type of plan. In this blog post, we will break down the four most common types of health insurance plans...",
  },
  {
    title: "5 Tips to Save Money on Car Insurance",
    date: "October 14, 2024",
    content:
      "Car insurance is essential, but it doesn’t have to be expensive. Here are five tips to save money on your car insurance...",
  },
  {
    title: "Life Insurance: Do You Really Need It?",
    date: "October 12, 2024",
    content:
      "Life insurance is often overlooked, but it’s one of the most important financial products to consider, especially if you have dependents...",
  },
  {
    title: "The Importance of Travel Insurance for International Trips",
    date: "October 10, 2024",
    content:
      "Travel insurance might seem like an unnecessary expense, but it can save you from significant financial losses if something goes wrong during your trip...",
  },
  {
    title: "The Benefits of Disability Insurance: Protecting Your Income",
    date: "October 5, 2024",
    content:
      "Disability insurance is an often-overlooked but essential coverage that protects your income in case you are unable to work due to injury or illness...",
  },
];

const Blog = () => {
  return (
    <div className="blog-section">
      <h2>Our Latest Blogs</h2>
      {blogs.map((blog, index) => (
        <div key={index} className="blog-post">
          <h3>{blog.title}</h3>
          <p>
            <em>{blog.date}</em>
          </p>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
