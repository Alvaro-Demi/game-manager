"use client";

import { useState } from "react";
import type { Game } from "@/lib/types";

type GameInput = Omit<Game, "id">;

export default function GameForm({
  initialValues,
  onSubmit,
  submitText,
  loadingText = "Guardando...",
}: {
  initialValues: GameInput;
  onSubmit: (values: GameInput) => Promise<void>;
  submitText: string;
  loadingText?: string;
}) {
  const [values, setValues] = useState<GameInput>(initialValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof GameInput>(key: K, value: GameInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validación mínima
    if (!values.title.trim() || !values.platform.trim() || !values.genre.trim() || !values.releaseDate) {
      setError("Rellena título, plataforma, género y fecha.");
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        ...values,
        title: values.title.trim(),
        platform: values.platform.trim(),
        genre: values.genre.trim(),
        coverUrl: (values.coverUrl ?? "").trim(),
      });
    } catch (err: any) {
      setError(err?.message ?? "Error al guardar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6">
      <div>
        <label className="text-sm text-white/70">Título *</label>
        <input
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
          className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20"
          placeholder="Ej: Hollow Knight"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm text-white/70">Plataforma *</label>
          <input
            value={values.platform}
            onChange={(e) => update("platform", e.target.value)}
            className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20"
            placeholder="Ej: PC, PS5..."
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Género *</label>
          <input
            value={values.genre}
            onChange={(e) => update("genre", e.target.value)}
            className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20"
            placeholder="Ej: Action RPG"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm text-white/70">Fecha lanzamiento *</label>
          <input
            type="date"
            value={values.releaseDate}
            onChange={(e) => update("releaseDate", e.target.value)}
            className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Carátula (URL)</label>
          <input
            value={values.coverUrl ?? ""}
            onChange={(e) => update("coverUrl", e.target.value)}
            className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-white/70">Favorito</label>
        <input
          type="checkbox"
          checked={values.favorite}
          onChange={(e) => update("favorite", e.target.checked)}
          className="h-4 w-4"
        />
      </div>

      {error && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

<button
          type="submit"
          className="button"
          disabled={saving}>
          <span className="button__text">{saving
            ? "Guardando..."
            : submitText === "Guardar cambios"
            ? "Guardar cambios"
            : "Crear juego"}</span>

            <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
        
          
        </button>
    </form>
  );
}
