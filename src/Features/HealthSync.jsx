import React from "react";
import WelcomeArea from "../components/WelcomeArea";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Chatbot from "../components/Chatbot";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/flex-slider.css";
import "../assets/css/font-awesome.css";
import "../assets/css/insurance-landing.css";
import "../assets/css/chatbot.css";

const HealthSync = () => {
  return (
    <div>
      <WelcomeArea />
      <Features />
      <Testimonials />
      <Chatbot />
    </div>
  );
};

export default HealthSync;
