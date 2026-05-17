import { useState } from "react";
import { Phone, X, Shield, AlertTriangle, ExternalLink } from "lucide-react";

const EMERGENCY_CONTACTS = [
  { name: "All Emergencies", number: "112", desc: "Police + Ambulance + Fire", priority: true },
  { name: "Women Helpline", number: "1091", desc: "24x7 Delhi & Noida", priority: true },
  { name: "Police", number: "100", desc: "Delhi Police control room", priority: false },
  { name: "Delhi Police PCR", number: "011-23490360", desc: "PCR van dispatch", priority: false },
  { name: "Noida Police", number: "0120-2431116", desc: "Noida control room", priority: false },
  { name: "Crime Stopper", number: "1090", desc: "Anonymous tip line", priority: false },
];

export function SOSButton() {
  const [open, setOpen] = useState(false);
  const [called, setCalled] = useState<string | null>(null);

  function handleCall(number: string, name: string) {
    setCalled(name);
    window.location.href = `tel:${number}`;
    setTimeout(() => setCalled(null), 3000);
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SOS Panel */}
      {open && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-80 animate-fadeUp">
          <div className="bg-white rounded-3xl shadow-2xl border border-border overflow-hidden">
            {/* Header */}
            <div className="bg-destructive px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white font-bold text-sm">Emergency Contacts</p>
                  <p className="text-white/70 text-xs">Tap any number to call</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Contacts list */}
            <div className="p-3 space-y-2">
              {EMERGENCY_CONTACTS.map((c) => (
                <button
                  key={c.number}
                  onClick={() => handleCall(c.number, c.name)}
                  className={`w-full flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-all text-left
                    ${
                      c.priority
                        ? "bg-destructive/10 border border-destructive/20 hover:bg-destructive/20"
                        : "bg-cream hover:bg-cream-dark border border-border"
                    }
                    ${called === c.name ? "scale-95 opacity-70" : ""}
                  `}
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold ${c.priority ? "text-destructive" : "text-ink"}`}
                    >
                      {c.name}
                    </p>
                    <p className="text-xs text-ink-light">{c.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`font-bold text-sm ${c.priority ? "text-destructive" : "text-ink"}`}
                    >
                      {c.number}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center
                      ${c.priority ? "bg-destructive" : "bg-ink"}`}
                    >
                      <Phone className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Share location tip */}
            <div className="mx-3 mb-3 bg-sun-soft border border-sun rounded-2xl px-4 py-3 flex gap-2">
              <AlertTriangle className="w-4 h-4 text-amber shrink-0 mt-0.5" />
              <p className="text-xs text-ink-light leading-relaxed">
                <span className="font-semibold text-ink">Safety tip:</span> Share your live location
                with a trusted contact before travelling at night.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating SOS button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full font-bold text-white shadow-2xl transition-all
          ${
            open
              ? "bg-ink scale-95"
              : "bg-destructive hover:bg-destructive/90 hover:scale-105 animate-pulse-soft"
          }`}
        aria-label="Open emergency contacts"
      >
        {open ? (
          <>
            <X className="w-4 h-4" />
            <span className="text-sm">Close</span>
          </>
        ) : (
          <>
            <Phone className="w-4 h-4" />
            <span className="text-sm">SOS</span>
          </>
        )}
      </button>
    </>
  );
}
