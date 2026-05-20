import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import zones from "@/data/zones.json";
import { ArrowDown, MapPin, Clock, Users, Search, Shuffle } from "lucide-react";

const allLocations = [
  ...zones.delhi.map((z) => ({ ...z, region: "Delhi" })),
  ...zones.noida.map((z) => ({ ...z, region: "Noida" })),
];

// Popular route quick-picks
const QUICK_PICKS = [
  { from: "Connaught Place", to: "Sector 18 Noida", label: "CP → Sector 18" },
  {
    from: "Lajpat Nagar",
    to: "Noida City Centre",
    label: "Lajpat → City Centre",
  },
  { from: "Saket", to: "Sector 62 Noida", label: "Saket → Sector 62" },
  {
    from: "Karol Bagh",
    to: "Sector 18 Noida",
    label: "Karol Bagh → Sector 18",
  },
];

export function RouteSearch() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState(() => {
    const n = new Date();
    return `${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}`;
  });
  const [gender, setGender] = useState<"any" | "female" | "male" | "group">(
    "any",
  );
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to)
      return setError("Please select a starting point and destination.");
    if (from === to)
      return setError("Origin and destination cannot be the same.");
    setError("");
    navigate({ to: "/routes", search: { from, to, time, gender } });
  }

  function applyQuickPick(pick: { from: string; to: string }) {
    setFrom(pick.from);
    setTo(pick.to);
    setError("");
  }

  function swapLocations() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

  const fieldCls =
    "w-full bg-white/80 border-2 border-border rounded-2xl px-4 py-3 text-sm text-ink outline-none focus:border-blush transition-colors appearance-none";
  const labelCls =
    "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-light mb-1.5";

  return (
    <div>
      {/* Quick picks */}
      <div className="mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-light block mb-2">
          Popular:
        </span>
        <div className="flex flex-wrap gap-2">
          {QUICK_PICKS.map((pick) => (
            <button
              key={pick.label}
              type="button"
              onClick={() => applyQuickPick(pick)}
              className="text-xs bg-white/70 border border-border rounded-full px-3 py-1.5 text-ink-light hover:border-blush hover:text-blush transition-colors whitespace-nowrap"
            >
              {pick.label}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={submit}
        className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-soft border border-border"
      >
        <div className="grid gap-4">
          {/* From */}
          <div>
            <label className={labelCls}>
              <MapPin className="w-3 h-3" />
              From
            </label>
            <select
              className={fieldCls}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              <option value="">Select starting point</option>
              <optgroup label="— Delhi —">
                {zones.delhi.map((z) => (
                  <option key={z.id} value={z.name}>
                    {z.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="— Noida —">
                {zones.noida.map((z) => (
                  <option key={z.id} value={z.name}>
                    {z.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Swap button */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <button
              type="button"
              onClick={swapLocations}
              title="Swap start and destination"
              className="w-9 h-9 rounded-full bg-gradient-warm flex items-center justify-center shadow-soft hover:scale-110 transition-transform group"
            >
              <ArrowDown className="w-4 h-4 text-ink group-hover:hidden" />
              <Shuffle className="w-4 h-4 text-blush hidden group-hover:block" />
            </button>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* To */}
          <div>
            <label className={labelCls}>
              <MapPin className="w-3 h-3" />
              To
            </label>
            <select
              className={fieldCls}
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              <option value="">Select destination</option>
              <optgroup label="— Delhi —">
                {zones.delhi.map((z) => (
                  <option key={z.id} value={z.name}>
                    {z.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="— Noida —">
                {zones.noida.map((z) => (
                  <option key={z.id} value={z.name}>
                    {z.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Time + Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>
                <Clock className="w-3 h-3" />
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={fieldCls}
              />
            </div>
            <div>
              <label className={labelCls}>
                <Users className="w-3 h-3" />
                Traveller
              </label>
              <select
                className={fieldCls}
                value={gender}
                onChange={(e) =>
                  setGender(
                    e.target.value as "any" | "female" | "male" | "group",
                  )
                }
              >
                <option value="any">Anyone</option>
                <option value="female">Solo female</option>
                <option value="male">Solo male</option>
                <option value="group">Group</option>
              </select>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-xl">
              ⚠ {error}
            </p>
          )}

          {/* Night warning preview */}
          {(() => {
            const h = parseInt(time.split(":")[0]);
            const isNight = h >= 21 || h < 6;
            return isNight ? (
              <div className="bg-sun-soft border border-sun rounded-xl px-3 py-2 text-xs text-amber font-medium">
                🌙 Night time selected — only road routes will be shown (metro
                unavailable after 11 PM)
              </div>
            ) : null;
          })()}

          {/* Submit */}
          <button
            type="submit"
            className="mt-1 inline-flex items-center justify-center gap-2 bg-ink text-cream rounded-2xl py-3.5 font-semibold text-sm hover:bg-blush transition-colors shadow-soft"
          >
            <Search className="w-4 h-4" />
            Find safe routes
          </button>
        </div>
      </form>

      {/* Emergency strip */}
      <div className="mt-4 bg-white/60 border border-border rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-ink">
            🚨 Emergency contacts
          </p>
          <p className="text-[11px] text-ink-light mt-0.5">
            Police: 100 · Women helpline: 1091 · All emergencies: 112
          </p>
        </div>
        <a
          href="tel:112"
          className="bg-destructive text-white rounded-xl px-4 py-2 text-xs font-semibold hover:opacity-90 transition-opacity shrink-0"
        >
          Call 112
        </a>
      </div>
    </div>
  );
}
