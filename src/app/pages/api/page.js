const apiKey = "e004e5626cb5d81af65f9ee420f42dbb"; // Use an environment variable for this
const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`City not found: ${city}`);
    }
    const data = await response.json();

    const apiData = {
      name: data.name,
      description: data.weather[0].description,
      temp: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
    return apiData;
  } catch (err) {
    console.error(err); // Log the error for debugging
    throw new Error("Failed to fetch weather data"); // Generic message for users
  }
};

export default fetchWeatherData;
