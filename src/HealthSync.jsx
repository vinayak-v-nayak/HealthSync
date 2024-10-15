import React from 'react';
import Header from './components/Header';
import WelcomeArea from './components/WelcomeArea';
import Features from '../src/components/Features';
import Testimonials from '../src/components/Testimonials';
import Chatbot from '../src/components/Chatbot';
import Footer from '../src/components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/flex-slider.css'
import './assets/css/font-awesome.css';
import './assets/css/insurance-landing.css';
import './assets/css/chatbot.css';


const HealthSync = () => {
  return (
    <div>
      <Header />
      <WelcomeArea />
      <Features />
      <Testimonials />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default HealthSync;
