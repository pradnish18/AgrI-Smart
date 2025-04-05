import React from 'react';
import './CropResult.css';

function CropResult({ data }) {
  return (
    <div className="result-container">
      {/* Weather and Soil Section */}
      <div className="weather-soil-section">
        <div className="weather-card">
          <h2>🌤 Weather Details</h2>
          <p><strong>Location:</strong> {data.location}</p>
          <p><strong>Month:</strong> {data.month}</p>
          <p><strong>Temperature:</strong> {data.weather.temperature}°C</p>
          <p><strong>Weather:</strong> {data.weather.description}</p>
        </div>

        <div className="soil-card">
          <h2>🌱 Soil Details</h2>
          <p><strong>Soil Type:</strong> {data.soilType}</p>
          <p><strong>pH Level:</strong> {data.pH ? data.pH.toFixed(2) : 'N/A'}</p>
          <p><strong>Clay Content:</strong> {data.clay ? data.clay.toFixed(2) : 'N/A'}%</p>
        </div>
      </div>

      {/* Suitable Crops Section */}
      <div className="crops-section">
        <h2>🌿 Suitable Crops</h2>
        <div className="crops-grid">
          {data.crops && data.crops.length > 0 ? (
            data.crops.map((crop) => (
              <div key={crop} className="crop-box">
                {crop}
              </div>
            ))
          ) : (
            <p>No crops available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CropResult;