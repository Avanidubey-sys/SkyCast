const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function fetchWeatherData(city: string) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OpenWeather API key");
  }

  // Fetch current weather
  const currentRes = await fetch(
    `${CURRENT_URL}?q=${city}&units=metric&appid=${apiKey}`
  );
  const currentData = await currentRes.json();

  if (!currentRes.ok) {
    console.error("Error fetching current weather:", currentData);
    throw new Error(currentData.message || "Failed to fetch current weather");
  }

  // Fetch forecast
  const forecastRes = await fetch(
    `${FORECAST_URL}?q=${city}&units=metric&appid=${apiKey}`
  );
  const forecastData = await forecastRes.json();

  if (!forecastRes.ok) {
    console.error("Error fetching forecast:", forecastData);
    throw new Error(forecastData.message || "Failed to fetch forecast");
  }

  const hourly = forecastData.list.slice(0, 8);
  const daily = forecastData.list.filter((_: any, idx: number) => idx % 8 === 0);

  return {
    city: currentData.name,
    current: currentData,
    hourly,
    daily,
  };
}
