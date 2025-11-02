"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-2 bg-white/20 p-3 backdrop-blur-md rounded-2xl shadow-lg"
    >
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter city name..."
        className="w-full bg-transparent text-black placeholder:text-white/70 border-white/40 focus-visible:ring-white"
      />
      <Button
        type="submit"
        variant="secondary"
        className="bg-white/80 text-blue-600 hover:bg-white"
      >
        <Search className="w-5 h-5" />
      </Button>
    </form>
  );
}
