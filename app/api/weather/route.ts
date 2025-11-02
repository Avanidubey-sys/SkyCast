import { NextResponse } from "next/server";
import { fetchWeatherData } from "@/lib/weather";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "London";

  try {
    const data = await fetchWeatherData(city);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Weather API error" },
      { status: 400 }
    );
  }
}
