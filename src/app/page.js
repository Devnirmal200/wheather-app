"use client";
import { useState, useEffect } from "react";
import fetchWeatherData from "@/app/pages/api/fetch";
import { FaChevronDown, FaSun, FaCloud } from "react-icons/fa";

export default function Home() {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cities = ["Moscow", "Paris", "New York", "Sydney", "Riyadh"];

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const data = await fetchWeatherData(city);
        setWeatherData(data);
        await saveWeatherData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getWeatherData();
  }, [city]);

  const handleCityChange = async (selectedCity) => {
    setCity(selectedCity);
    setDropdownOpen(false);
  };

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

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center "
      style={{ backgroundImage: "url('/images.jpeg')" }}
    >
      <div className="mx-12 bg-opacity-60 rounded-8xl p-18 flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-10 max-w-12xl w-full">
        <div className="w-full md:w-1/2 lg:w-1/3 h-80 md:h-auto p-6 bg-orange-200 shadow-md rounded-xl text-orange-300 flex flex-col justify-center">
          <div className="flex flex-col items-center text-center p-8">
            <div className="flex items-center justify-center ">
              <h1 className="text-3xl font-bold">Today</h1>
              <FaChevronDown className="ml-2 text-2xl cursor-pointer" />
            </div>
            <div className="mt-4 flex items-center justify-center p-2">
              <FaSun className="text-5xl text-yellow-500 mr-2" />
              <p className="text-5xl font-bold">
                {weatherData
                  ? Math.round(weatherData.temp) + "°"
                  : "Loading..."}
              </p>
            </div>
            <p className="text-2xl">
              {weatherData ? weatherData.description : "Fetching weather..."}
            </p>
            <div className="flex items-center justify-center p-2 ">
              <p
                className="text-xl cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {weatherData ? weatherData.name : "City"}
              </p>
              <FaChevronDown className="ml-2 cursor-pointer" />
            </div>
            {dropdownOpen && (
              <div className="absolute bg-white shadow-lg rounded-lg mt-2 ">
                {cities.map((cityName) => (
                  <div
                    key={cityName}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleCityChange(cityName)}
                  >
                    {cityName}
                  </div>
                ))}
              </div>
            )}
            <p className="text-xl">{new Date().toLocaleDateString()}</p>
            <div className="mt-4">
              <p className="text-xl">
                Feels like{" "}
                {weatherData
                  ? Math.round(weatherData.temp) + "°"
                  : "Loading..."}{" "}
                | Sunset 18:20
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-2/3 flex flex-col space-y-3">
          <div className="bg-blue-200 bg-opacity-30 p-6 rounded-xl shadow-md grid grid-cols-2 sm:grid-cols-5 gap-5 text-center text-md h-auto mb-4">
            {[
              "Now",
              "2 AM",
              "3 AM",
              "4 AM",
              "5 AM",
              "6 AM",
              "7 AM",
              "8 AM",
              "9 AM",
              "10 AM",
            ].map((time, index) => (
              <div key={index} className="flex flex-col items-center">
                <p>{time}</p>
                <div className="flex items-center space-x-2">
                  <FaCloud className="text-2xl text-gray-500 " />
                  <p>{25 - index}°</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-opacity-40 p-4 rounded-xl text-lg mt-4">
            <h2 className="font-bold text-xl">Random Text</h2>
            <p className="mt-2">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Lorem ipsum may be used as a
              placeholder before the final copy is available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
