"use client";

import { useEffect, useState } from "react";
import type { Game } from "@/lib/types";
import Link from "next/link";
import GameCardClient from "@/components/GameCardClient";

export default function FavoritesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // JSON Server soporta ?favorite=true
        const res = await fetch("/api/games?favorite=true", { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudieron cargar favoritos");
        const data = await res.json();
        setGames(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleDelete(id: number) {
    const ok = confirm("¿Seguro que quieres eliminar este juego?");
    if (!ok) return;

    const res = await fetch(`/api/games/${id}`, { method: "DELETE" });
    if (!res.ok) return;

    setGames((prev) => prev.filter((g) => g.id !== id));
  }

  async function handleToggleFavorite(id: number, nextValue: boolean) {
    const res = await fetch(`/api/games/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorite: nextValue }),
    });

    if (!res.ok) return;

    // Si lo quitas de favoritos, lo sacamos de esta lista
    if (!nextValue) {
      setGames((prev) => prev.filter((g) => g.id !== id));
      return;
    }

    setGames((prev) =>
      prev.map((g) => (g.id === id ? { ...g, favorite: nextValue } : g))
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-4 sm:p-6">
      <header className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Favoritos ★</h1>
            <p className="mt-1 text-sm text-white/60">
              {loading ? "Cargando..." : `${games.length} favorito(s)`}
            </p>
          </div>

          <Link
            href="/"
            className="rounded-md bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
          >
            Volver al catálogo
          </Link>
        </div>
      </header>

      {loading ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
          Cargando...
        </div>
      ) : games.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
          No tienes juegos favoritos todavía. Marca alguno desde el catálogo.
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <GameCardClient
              key={g.id}
              game={g}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </section>
      )}
    </main>
  );
}
