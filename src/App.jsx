import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InsuranceServices from "./Features/InsuranceServices";
import HealthSync from "./Features/HealthSync";
import Blog from "./Features/Blog";
import PolicyRecommendation from "./Features/PolicyRecommendation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FitnessScore from "./Features/FitnessScore";
import Auth from "./Features/login";
import Profile from "./Features/profile";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Other routes */}
        <Route path="" element={<HealthSync />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/fitness" element={<FitnessScore />} />
        <Route path="/services" element={<InsuranceServices />} />
        <Route path="/recommendation" element={<PolicyRecommendation />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
