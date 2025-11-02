type CurrentWeatherCardProps = {
  weather: any;
};

export default function CurrentWeatherCard({ weather }: CurrentWeatherCardProps) {
  return (
    <div className="p-6 bg-white/10 rounded-2xl text-center">
      <h2 className="text-2xl font-semibold mb-2">{weather?.name || "—"}</h2>
      <p className="text-5xl font-bold mb-1">
        {weather?.main?.temp !== undefined ? `${Math.round(weather.main.temp)}°C` : "—"}
      </p>
      <p className="text-lg capitalize mb-1">{weather?.weather?.[0]?.description || "—"}</p>
      <p className="text-sm opacity-70">Humidity: {weather?.main?.humidity ?? "—"}%</p>
      <p className="text-sm opacity-70">Wind: {weather?.wind?.speed ?? "—"} m/s</p>
    </div>
  );
}
