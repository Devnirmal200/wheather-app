const saveWeatherData = async (data) => {
    try {
      const response = await fetch("/api/weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
     
    } catch (error) {
      console.error("Failed to save weather data:", error);
    }
  };
export default saveWeatherData