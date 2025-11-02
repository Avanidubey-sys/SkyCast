"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface WeeklyForecastProps {
  city: string;
}

export default function WeeklyForecast({ city }: WeeklyForecastProps) {
  const [daily, setDaily] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDaily = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load weekly forecast");
        return;
      }

      setDaily(data.daily);
    } catch {
      setError("Something went wrong while fetching forecast");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDaily();
  }, [city]);

  if (loading)
    return <p className="text-center text-white/80">Loading weekly data...</p>;
  if (error)
    return (
      <p className="text-center text-red-200 bg-red-600/40 p-3 rounded-lg">
        {error}
      </p>
    );

  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-3">📆 5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {daily.map((d, idx) => (
          <Card
            key={idx}
            className="bg-white/20 backdrop-blur-md text-center p-3 text-white"
          >
            <CardContent className="p-2">
              <p className="text-sm opacity-80">
                {new Date(d.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${d.weather[0].icon}.png`}
                alt={d.weather[0].description}
                className="mx-auto w-10 h-10"
              />
              <p className="text-lg font-semibold">
                {Math.round(d.main.temp)}°C
              </p>
              <p className="text-sm capitalize opacity-80">
                {d.weather[0].description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
