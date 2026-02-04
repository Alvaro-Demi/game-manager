"use client";

import { useRouter } from "next/navigation";
import GameForm from "@/components/GameForm";
import type { Game } from "@/lib/types";
import Link from "next/link";

type GameInput = Omit<Game, "id">;

export default function NewGamePage() {
  const router = useRouter();

  async function createGame(values: GameInput) {
    const res = await fetch("/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) throw new Error("No se pudo crear el juego");

    const created = await res.json();

    // Ir al detalle del creado
    router.push(`/games/${created.id}`);
  }

  return (
    <main className="mx-auto max-w-4xl p-4 sm:p-6 space-y-4">
      <Link href="/" className="text-sm text-white/60 hover:text-white">
        ← Volver
      </Link>

      <header>
        <h1 className="text-2xl font-bold">Añadir juego</h1>
        <p className="mt-1 text-sm text-white/60">Rellena los datos y guarda.</p>
      </header>

      <GameForm
        initialValues={{
          title: "",
          platform: "",
          genre: "",
          releaseDate: "",
          coverUrl: "",
          favorite: false,
        }}
        onSubmit={createGame}
        submitText="Crear"
      />
    </main>
  );
}
