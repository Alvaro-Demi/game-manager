"use client";

import { useEffect, useState } from "react";
import type { Game } from "@/lib/types";
import GamesCatalog from "@/components/GamesCatalog";

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/games", { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudieron cargar los juegos");
        const data = await res.json();
        setGames(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="mx-auto max-w-5xl p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Mi colección 🎮</h1>
        <p className="mt-1 text-sm text-white/60">
          {loading ? "Cargando..." : `${games.length} juego(s)`}
        </p>
      </header>

      {/* OJO: ahora initialGames llega cuando carga */}
      <GamesCatalog initialGames={games} />
    </main>
  );
}
