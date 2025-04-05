import React, { useState } from 'react';
import './styles/App.css';
import fetchData from './api/fetchData';
import CropResult from './componenets/CropResult';

function App() {
  const [city, setCity] = useState('');
  const [month, setMonth] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!city || !month) return setError('Enter city and month');

    setLoading(true);
    setError('');
    try {
      const res = await fetchData(city, month); // Pass both city and month
      setData(res);
    } catch (err) {
      setError(err.message || 'City not found or API error');
      setData(null);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🌾 Crop Suggestion App</h1>
      <div className="form">
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city..." />
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">Select month</option>
          {[
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
          ].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <button onClick={handleSubmit}>Suggest</button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {data && <CropResult data={data} />}
    </div>
  );
}

export default App;