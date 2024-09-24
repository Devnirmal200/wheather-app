const apiKey = process.env.NEXT_PUBLIC_API_KEY;

 
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
    console.error(err); 
    throw new Error("Failed to fetch weather data");
  }
};

export default fetchWeatherData;
