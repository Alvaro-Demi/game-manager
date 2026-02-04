"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import GameForm from "@/components/GameForm";
import type { Game } from "@/lib/types";
import Link from "next/link";

type GameInput = Omit<Game, "id">;

export default function EditGamePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [initial, setInitial] = useState<GameInput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/games/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudo cargar el juego");
        const game: Game = await res.json();

        setInitial({
          title: game.title,
          platform: game.platform,
          genre: game.genre,
          releaseDate: game.releaseDate,
          coverUrl: game.coverUrl ?? "",
          favorite: game.favorite,
        });
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id]);

  async function updateGame(values: GameInput) {
    const res = await fetch(`/api/games/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) throw new Error("No se pudo actualizar el juego");

    router.push(`/games/${id}`);
  }

  return (
    <main className="mx-auto max-w-4xl p-4 sm:p-6 space-y-4">
      <Link href={`/games/${id}`} className="text-sm text-white/60 hover:text-white">
        ← Volver al detalle
      </Link>

      <header>
        <h1 className="text-2xl font-bold">Editar juego</h1>
        <p className="mt-1 text-sm text-white/60">Modifica y guarda los cambios.</p>
      </header>

      {loading ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
          Cargando...
        </div>
      ) : !initial ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
          No se pudo cargar el juego.
        </div>
      ) : (
        <GameForm
          initialValues={initial}
          onSubmit={updateGame}
          submitText="Guardar cambios"
        />
      )}
    </main>
  );
}
