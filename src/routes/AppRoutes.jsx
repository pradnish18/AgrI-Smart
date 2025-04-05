import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import WeatherAndSoil from '../components/WeatherAndSoil';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/weather-soil" element={<WeatherAndSoil />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;