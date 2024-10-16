import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InsuranceServices from './Insurance-Services'; // Import the new component
import HealthSync from './HealthSync';
import Blog from './Blog'
import PolicyRecommendation from './PolicyRecommendation';
import ContactUs from './ContactUs';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Other routes */}
        <Route path="" element={<HealthSync />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/services" element={<InsuranceServices />} />
        <Route path="/recommendation" element={<PolicyRecommendation />} />
        <Route path="/ContactUs" element={<ContactUs />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
