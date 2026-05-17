import { Link } from "@tanstack/react-router";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const linkBase = "px-4 py-1.5 rounded-full text-sm font-medium transition-all";
  const mobileLinkBase =
    "block px-4 py-3 text-sm font-medium text-ink hover:text-blush border-b border-border transition-colors";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-cream/70 border-b border-border">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
          <span className="w-9 h-9 rounded-full bg-gradient-warm flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4 text-ink" strokeWidth={2.5} />
          </span>
          <div className="leading-none">
            <span className="font-display text-xl font-black text-ink tracking-tight">Nirbhay</span>
            <span className="block text-[10px] italic text-blush mt-0.5">walk fearless</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1 bg-white/60 p-1 rounded-full border border-border">
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

        {/* Hamburger button - mobile only */}
        <button
          className="sm:hidden p-2 rounded-full hover:bg-white/60 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5 text-ink" /> : <Menu className="w-5 h-5 text-ink" />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="sm:hidden bg-cream/95 backdrop-blur-xl border-b border-border">
          <Link
            to="/"
            className={mobileLinkBase}
            activeOptions={{ exact: true }}
            activeProps={{ className: `${mobileLinkBase} text-blush font-semibold` }}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/routes"
            className={mobileLinkBase}
            activeProps={{ className: `${mobileLinkBase} text-blush font-semibold` }}
            onClick={() => setIsOpen(false)}
          >
            Routes
          </Link>
          <Link
            to="/reviews"
            className={mobileLinkBase}
            activeProps={{ className: `${mobileLinkBase} text-blush font-semibold` }}
            onClick={() => setIsOpen(false)}
          >
            Reviews
          </Link>
        </div>
      )}
    </nav>
  );
}
