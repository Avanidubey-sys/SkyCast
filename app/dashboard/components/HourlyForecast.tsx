"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface HourlyForecastProps {
  city: string;
}

export default function HourlyForecast({ city }: HourlyForecastProps) {
  const [hourly, setHourly] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHourly = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load hourly forecast");
        return;
      }

      setHourly(data.hourly);
    } catch {
      setError("Something went wrong while fetching forecast");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHourly();
  }, [city]);

  if (loading)
    return <p className="text-center text-white/80">Loading hourly data...</p>;
  if (error)
    return (
      <p className="text-center text-red-200 bg-red-600/40 p-3 rounded-lg">
        {error}
      </p>
    );

  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-3">🌤️ Next 24 Hours</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
        {hourly.map((h, idx) => (
          <Card
            key={idx}
            className="bg-white/20 backdrop-blur-md text-center p-3 text-white"
          >
            <CardContent className="p-2">
              <p className="text-sm opacity-80">
                {new Date(h.dt * 1000).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${h.weather[0].icon}.png`}
                alt={h.weather[0].description}
                className="mx-auto w-10 h-10"
              />
              <p className="text-lg font-semibold">
                {Math.round(h.main.temp)}°C
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

