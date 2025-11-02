"use client";

import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import HourlyForecast from "./components/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast";
import FavouritesList from "./components/FavouritesList";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
}

export default function DashboardPage() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch weather data from your API route
  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/weather?city=${cityName}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch weather");
        return;
      }

      // ✅ Extract only current weather data
      setWeather(data.current);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-300 to-blue-500 p-6 text-gray-900">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg mb-4">
          🌤️ SkyCast Dashboard
        </h1>

        {/* 🔍 Search Input */}
        <SearchBar onSearch={(query) => setCity(query)} />

        {/* ⏳ Loading State */}
        {loading && (
          <p className="text-center text-white/90">Fetching weather data...</p>
        )}

        {/* ❌ Error Message */}
        {error && (
          <p className="text-center text-red-200 bg-red-600/40 p-3 rounded-lg">
            {error}
          </p>
        )}

        {/* 🌦️ Weather Display */}
        {weather && (
          <div className="space-y-6">
            <CurrentWeatherCard weather={weather} />
            <HourlyForecast city={city} />
            <WeeklyForecast city={city} />
            <FavouritesList onSelect={(fav) => setCity(fav)} />
          </div>
        )}
      </div>
    </main>
  );
}
