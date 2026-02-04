"use client";

import type { Game } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import GameCardClient from "@/components/GameCardClient";

export default function GamesCatalog({ initialGames }: { initialGames: Game[] }) {
    const [games, setGames] = useState<Game[]>(initialGames);
    const [loading, setLoading] = useState(false);
    const [platform, setPlatform] = useState("");
    const [genre, setGenre] = useState("");

    const genres = useMemo(() => {
        const set = new Set(games.map((g) => g.genre).filter(Boolean));
        return ["", ...Array.from(set).sort()];
    }, [games]);

    const platforms = useMemo(() => {
        const set = new Set(games.map((g) => g.platform).filter(Boolean));
        return ["", ...Array.from(set).sort()];
    }, [games]);

    useEffect(() => {
        async function run() {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (genre) params.set("genre", genre);
                if (platform) params.set("platform", platform);

                const url = params.toString() ? `/api/games?${params.toString()}` : `/api/games`;
                const res = await fetch(url, { cache: "no-store" });
                const data = await res.json();
                setGames(data);
            } finally {
                setLoading(false);
            }
        }
        run();
    }, [genre, platform]);

    async function handleDelete(id: number) {
        const ok = confirm("¿Seguro que quieres eliminar este juego?");
        if (!ok) return;

        const res = await fetch(`/api/games/${id}`, { method: "DELETE" });
        if (!res.ok) return;

        setGames(prev => prev.filter(g => g.id !== id));
    }

    async function handleToggleFavorite(id: number, next: boolean) {
        const res = await fetch(`/api/games/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ favorite: next }),
        });
        if (!res.ok) return;

        setGames(prev => prev.map(g => (g.id === id ? { ...g, favorite: next } : g)));
    }

    return (
        <div className="space-y-4">
            <section className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-5 shadow-lg shadow-black/20 backdrop-blur-sm sm:flex-row sm:items-end">
                <div className="flex-1">
                    <label className="block text-xs font-medium uppercase tracking-wider text-white/60">Género</label>
                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 py-2.5 pl-3 pr-8 text-sm text-white outline-none transition focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/30"
                    >
                        {genres.map((g) => (
                            <option key={g || "all"} value={g}>
                                {g || "Todos"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-1">
                    <label className="block text-xs font-medium uppercase tracking-wider text-white/60">Plataforma</label>
                    <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 py-2.5 pl-3 pr-8 text-sm text-white outline-none transition focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/30"
                    >
                        {platforms.map((p) => (
                            <option key={p || "all"} value={p}>
                                {p || "Todas"}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={() => { setGenre(""); setPlatform(""); }}
                    className="rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium transition hover:bg-white/20 hover:border-white/25"
                >
                    Limpiar
                </button>
            </section>

            <div className="flex items-center justify-between text-sm text-white/60">
                <span>{loading ? "Cargando..." : `${games.length} juego(s)`}</span>
            </div>

            {games.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
                    No hay juegos que coincidan con esos filtros.
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
        </div>
    );
}
