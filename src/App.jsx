import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeContent from "./component/HomeContent";
import About from "./component/AboutUs";
import Contact from "./component/ContactUs";
import Footer from "./component/Footer";
import AdminDashboard from './component/AdminDashboard';
import Login from './component/Login'; // The Login component is already handling Signup logic
import UserSettings from "./component/UserSettings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomeContent />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="user" element={<UserSettings />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
