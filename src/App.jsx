import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InsuranceServices from './components/Policies/InsuranceServices/InsuranceServices';
import HealthSync from './HealthSync';
import Blog from './components/Blog/Blog';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FitnessScore from './components/Fitness Score/FitnessScore';
import Auth from './components/Sign In/login';
import Profile from './components/Profile/profile';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute component
import UserForm from './components/UserDetails/UserForm';
import ProtectedPage from './ProtectedPage'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/blog" element={<PrivateRoute><Blog /></PrivateRoute>} />
        <Route path="/fitness" element={<PrivateRoute><FitnessScore /></PrivateRoute>} />
        <Route path="/services" element={<PrivateRoute><InsuranceServices /></PrivateRoute>} />
        <Route path="/login" element={<Auth />} />
        
        
        {/* Private Route - Protected */}
        <Route path="/" element={ <HealthSync />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        
        {/* Other Routes */}
        <Route path="/userform" element={<PrivateRoute><UserForm /></PrivateRoute>} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
