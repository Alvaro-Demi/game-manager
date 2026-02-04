import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4 sm:p-6">
        <Link href="/" className="text-lg font-semibold hover:opacity-90">
          GameCollection 🎮
        </Link>

        <div className="flex items-center gap-2">
          <Link className="rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white" href="/">
            Inicio
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm text-yellow-500/90 hover:bg-yellow-500/20 hover:text-yellow-200" href="/favorites">
            Favoritos
          </Link>
          <Link
            href="/games/new"
          >
            <button type="button" className="button">
              <span className="button__text">Añadir Juego </span>
              <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
