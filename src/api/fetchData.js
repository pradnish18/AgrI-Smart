import axios from 'axios';

const fetchData = async (city) => {
  const weatherKey = 'f00c38e0279b7bc85480c3fe775d518c';

  try {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`;
    const weatherRes = await axios.get(weatherURL);
    const { lon, lat } = weatherRes.data.coord;

    const temperature = weatherRes.data.main.temp;
    const weatherDescription = weatherRes.data.weather[0].description;

    const soilURL = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&property=phh2o&property=clay&depth=0-5cm&value=mean`;
    const soilRes = await axios.get(soilURL);

    // Extract pH and clay values from the response
    const clay = soilRes.data.properties?.clay?.['0-5cm']?.mean
      ? soilRes.data.properties.clay['0-5cm'].mean / 10
      : null;

    const pH = soilRes.data.properties?.phh2o?.['0-5cm']?.mean
      ? soilRes.data.properties.phh2o['0-5cm'].mean / 10
      : null;

    let soilType = 'Unknown';
    if (clay > 40) soilType = 'Clay';
    else if (clay < 20) soilType = 'Sandy';
    else if (clay >= 20 && clay <= 40 && pH >= 6.5 && pH <= 7.5) soilType = 'Loamy-Sandy';
    else if (pH < 5.5) soilType = 'Acidic Soil';
    else if (pH > 8.5) soilType = 'Alkaline Soil';
    else if (clay >= 20 && clay <= 40) soilType = 'Loamy';

    let crops = [];
    if (soilType === 'Loamy' && pH >= 6 && pH <= 7.5) {
      crops = ['Wheat', 'Maize', 'Barley', 'Pulses'];
    } else if (soilType === 'Sandy' && pH < 6) {
      crops = ['Groundnut', 'Cotton', 'Millets'];
    } else if (soilType === 'Clay' && pH >= 5.5 && pH <= 7.5) {
      crops = ['Paddy', 'Sugarcane', 'Soybean'];
    } else if (soilType === 'Loamy-Sandy' && pH >= 6.5 && pH <= 7.5) {
      crops = ['Vegetables', 'Fruits', 'Legumes'];
    } else if (soilType === 'Acidic Soil' && pH < 5.5) {
      crops = ['Tea', 'Coffee', 'Pineapple'];
    } else if (soilType === 'Alkaline Soil' && pH > 8.5) {
      crops = ['Barley', 'Sugar Beet', 'Cotton'];
    } else {
      crops = ['Millets', 'Pulses', 'Sorghum'];
    }

    return {
      location: weatherRes.data.name,
      lat,
      lon,
      pH,
      clay,
      soilType,
      crops,
      weather: {
        temperature,
        description: weatherDescription,
      },
    };
  } catch (err) {
    console.error('Error fetching data:', err);
    return { error: 'Location not found or API error.' };
  }
};

export default fetchData;
