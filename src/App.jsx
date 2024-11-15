import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InsuranceServices from "../src/components/Policies/InsuranceServices/InsuranceServices";
import HealthSync from "./HealthSync";
import Blog from "../src/components/Blog/Blog";
// import PolicyRecommendation from "./Features/PolicyRecommendation";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import FitnessScore from "../src/components/Fitness Score/FitnessScore";
import Auth from "../src/components/Sign In/login";
import Profile from "../src/components/Profile/profile";
// import GeneralPolicies from "./components/GeneralPolicies";
// import RecommendedPolicies from "./components/RecommendedPolicies";

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
        {/* <Route path="/recommendation" element={<PolicyRecommendation />} /> */}
        <Route path="/login" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/services" element={<RecommendedPolicies />} /> 
        <Route path="/general" element={<GeneralPolicies />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
