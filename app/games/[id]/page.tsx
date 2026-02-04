"use client";

import { useEffect, useState } from "react";
import type { Game } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function GameDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/games/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudo cargar el juego");
        const data = await res.json();
        setGame(data);
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id]);

  return (
    <main className="mx-auto max-w-4xl p-4 sm:p-6">
      <Link href="/" className="text-sm text-white/60 hover:text-white">
        ← Volver
      </Link>

      {loading ? (
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
          Cargando...
        </div>
      ) : !game ? (
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
          Juego no encontrado.
        </div>
      ) : (
        <header className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <h1 className="text-2xl font-bold">{game.title}</h1>
          <p className="mt-1 text-sm text-white/70">
            {game.platform} · {game.genre}
          </p>
          <p className="mt-1 text-xs text-white/50">
            Lanzamiento: {game.releaseDate}
          </p>

          {game.coverUrl ? (
            <img
              className="mt-4 w-full max-w-sm rounded-lg border border-white/10"
              src={game.coverUrl}
              alt={game.title}
            />
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              className="rounded-md bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
              href={`/games/${game.id}/edit`}
            >
              Editar
            </Link>
          </div>
        </header>
      )}
    </main>
  );
}
