import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export function Navbar() {
  const linkBase = "px-4 py-1.5 rounded-full text-sm font-medium transition-all";
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-cream/70 border-b border-border">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-full bg-gradient-warm flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4 text-ink" strokeWidth={2.5} />
          </span>
          <div className="leading-none">
            <span className="font-display text-xl font-black text-ink tracking-tight">Nirbhay</span>
            <span className="block text-[10px] italic text-blush mt-0.5">walk fearless</span>
          </div>
        </Link>

        <div className="flex items-center gap-1 bg-white/60 p-1 rounded-full border border-border">
          <Link
            to="/"
            className={linkBase}
            activeOptions={{ exact: true }}
            activeProps={{ className: `${linkBase} bg-blush text-white shadow-soft` }}
            inactiveProps={{ className: `${linkBase} text-ink-light hover:text-ink` }}
          >
            Home
          </Link>
          <Link
            to="/routes"
            className={linkBase}
            activeProps={{ className: `${linkBase} bg-blush text-white shadow-soft` }}
            inactiveProps={{ className: `${linkBase} text-ink-light hover:text-ink` }}
          >
            Routes
          </Link>
          <Link
            to="/reviews"
            className={linkBase}
            activeProps={{ className: `${linkBase} bg-blush text-white shadow-soft` }}
            inactiveProps={{ className: `${linkBase} text-ink-light hover:text-ink` }}
          >
            Reviews
          </Link>
        </div>
      </div>
    </nav>
  );
}
