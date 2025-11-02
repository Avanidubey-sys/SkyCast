// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-sky-400 text-center">
      <h1 className="text-4xl font-bold mb-4 text-white drop-shadow">
        ☀️ Welcome to SkyCast
      </h1>
      <p className="text-white/90 mb-6">
        Get real-time weather updates and forecasts for any city!
      </p>
      <Link href="/dashboard">
        <Button className="bg-white text-blue-600 hover:bg-blue-100">
          Go to Dashboard
        </Button>
      </Link>
    </main>
  );
}
