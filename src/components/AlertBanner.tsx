import { useState, useEffect } from "react";
import { Moon, Sunset, AlertTriangle, X, Shield } from "lucide-react";

type AlertLevel = "night" | "evening" | "safe" | null;

function getAlertLevel(hour: number): AlertLevel {
  if (hour >= 22 || hour < 5) return "night";
  if (hour >= 20 && hour < 22) return "evening";
  if (hour >= 5 && hour < 7) return "night"; // early morning also risky
  return null; // daytime — no banner needed
}

const ALERTS: Record<
  NonNullable<AlertLevel>,
  {
    icon: React.ElementType;
    bg: string;
    border: string;
    iconColor: string;
    title: string;
    message: string;
    tip: string;
  }
> = {
  night: {
    icon: Moon,
    bg: "bg-[#1A1A1A]",
    border: "border-[#333]",
    iconColor: "text-amber",
    title: "Night travel advisory active",
    message:
      "It's late. Stick to main roads, avoid shortcuts and isolated stretches. Metro service may have ended.",
    tip: "Share your live location with a trusted contact before you leave.",
  },
  evening: {
    icon: Sunset,
    bg: "bg-sun-soft",
    border: "border-sun",
    iconColor: "text-amber",
    title: "Evening hours — stay alert",
    message: "Traffic is high and lighting is reducing. Metro is your safest option before 11 PM.",
    tip: "Avoid shortcut lanes and stay on well-lit main roads.",
  },
  safe: {
    icon: Shield,
    bg: "bg-sage/10",
    border: "border-sage/30",
    iconColor: "text-sage",
    title: "Good time to travel",
    message: "Daytime travel is generally safe across Delhi and Noida.",
    tip: "Always check route-specific hotspot warnings before you leave.",
  },
};

export function AlertBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [level, setLevel] = useState<AlertLevel>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    setLevel(getAlertLevel(hour));

    // Update every 5 minutes
    const interval = setInterval(
      () => {
        const h = new Date().getHours();
        setLevel(getAlertLevel(h));
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  if (!level || dismissed) return null;

  const a = ALERTS[level];
  const Icon = a.icon;
  const isNight = level === "night";

  return (
    <div className={`${a.bg} ${a.border} border-b px-4 py-3 flex items-start gap-3 relative`}>
      <div className={`mt-0.5 shrink-0 ${a.iconColor}`}>
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold ${isNight ? "text-cream" : "text-ink"}`}>{a.title}</p>
        <p
          className={`text-xs mt-0.5 leading-relaxed ${isNight ? "text-cream/70" : "text-ink-light"}`}
        >
          {a.message}
        </p>
        <p className={`text-xs mt-1 font-medium ${isNight ? "text-amber" : "text-amber"}`}>
          💡 {a.tip}
        </p>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors
          ${isNight ? "hover:bg-white/10 text-cream/50 hover:text-cream" : "hover:bg-black/10 text-ink-light"}`}
        aria-label="Dismiss alert"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// Inline alert for use inside route cards
export function InlineAlert({ hour, gender }: { hour: number; gender: string }) {
  const level = getAlertLevel(hour);
  if (!level) return null;

  const isNight = level === "night";
  const isFemale = gender === "female";

  return (
    <div
      className={`rounded-2xl p-3 flex gap-2 mb-4 ${
        isNight ? "bg-[#1A1A1A] border border-[#333]" : "bg-sun-soft border border-sun"
      }`}
    >
      {isNight ? (
        <Moon className="w-4 h-4 text-amber shrink-0 mt-0.5" />
      ) : (
        <Sunset className="w-4 h-4 text-amber shrink-0 mt-0.5" />
      )}
      <div>
        <p className={`text-xs font-semibold ${isNight ? "text-cream" : "text-ink"}`}>
          {isNight ? "Night travel advisory" : "Evening advisory"}
        </p>
        <p
          className={`text-xs mt-0.5 leading-relaxed ${isNight ? "text-cream/70" : "text-ink-light"}`}
        >
          {isNight
            ? `Stick to main roads. Avoid shortcuts and underpasses.${isFemale ? " Share your live location before leaving." : ""} Metro unavailable after 11 PM.`
            : "Evening hours — traffic is high. Metro is the safer option before 11 PM."}
        </p>
      </div>
    </div>
  );
}

// Hotspot inline warning card
export function HotspotWarning({ hotspots }: { hotspots: string[] }) {
  if (!hotspots || hotspots.length === 0) return null;
  return (
    <div className="bg-destructive/10 rounded-2xl p-3 mt-2 flex gap-2">
      <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
      <div>
        <p className="text-[11px] font-semibold text-destructive mb-1">Avoid these spots</p>
        {hotspots.map((h, i) => (
          <p key={i} className="text-xs text-destructive/90 leading-relaxed">
            • {h}
          </p>
        ))}
      </div>
    </div>
  );
}
