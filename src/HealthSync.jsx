import React from "react";
import WelcomeArea from "../src/components/Home/WelcomeArea/WelcomeArea";
import Features from "../src/components/Home/Features/Features";
import Testimonials from "../src/components/Home/Testimonials/Testimonials";
import Chatbot from "../src/components/Chatbot/Chatbot";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/flex-slider.css";
import "../src/assets/css/font-awesome.css";
import '../src/assets/css/global.css'
import '../src/assets/css/parallax&home-seperator.css'


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
