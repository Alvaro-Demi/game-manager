"use client";

import Link from "next/link";
import type { Game } from "@/lib/types";

export default function GameCardClient({
  game,
  onDelete,
  onToggleFavorite,
}: {
  game: Game;
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number, next: boolean) => void;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-white/20">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-white/10">
  {game.coverUrl ? (
    <img
      src={game.coverUrl}
      alt={game.title}
      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center text-xs text-white/50">
      No cover
    </div>
  )}
</div>

<div className="p-3">
  <h3 className="truncate text-lg font-semibold">{game.title}</h3>

  <p className="mt-1 text-sm text-white/70">
    {game.platform} · {game.genre}
  </p>

  <div className="mt-3 flex flex-wrap gap-2">
    <Link
      href={`/games/${game.id}`}
      className="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15"
    >
      Detalles
    </Link>

    <button
      onClick={() => onToggleFavorite(game.id, !game.favorite)}
      className="rounded-md bg-yellow-500/20 px-3 py-1.5 text-sm hover:bg-yellow-500/20 hover:text-yellow-200"
    >
      {game.favorite ? "Quitar ★" : "Añadir ★"}
    </button>

    <button
      onClick={() => onDelete(game.id)}
      className="rounded-md bg-red-500/20 px-3 py-1.5 text-sm text-red-200 hover:bg-red-500/25"
    >
      Eliminar
    </button>
  </div>
</div>

</article>
);
}
