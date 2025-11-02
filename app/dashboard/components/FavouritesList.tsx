"use client";

import { Button } from "@/components/ui/button";

interface FavouritesListProps {
  onSelect: (city: string) => void;
}

export default function FavouritesList({ onSelect }: FavouritesListProps) {
  const favourites = ["London", "New York", "Tokyo", "Paris", "Delhi", "Sydney"];

  return (
    <section className="text-center space-y-3">
      <h2 className="text-2xl font-semibold text-white">⭐ Favourite Cities</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {favourites.map((city) => (
          <Button
            key={city}
            onClick={() => onSelect(city)}
            className="bg-white/20 text-white hover:bg-white/40 rounded-full"
          >
            {city}
          </Button>
        ))}
      </div>
    </section>
  );
}
