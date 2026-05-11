import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import zones from "@/data/zones.json";
import { ArrowDown, MapPin, Clock, Users, Search } from "lucide-react";

export function RouteSearch() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState(() => {
    const n = new Date();
    return `${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}`;
  });
  const [gender, setGender] = useState("any");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to) return setError("Please select a starting point and destination.");
    if (from === to) return setError("Origin and destination cannot be the same.");
    setError("");
    navigate({ to: "/routes", search: { from, to, time, gender } });
  }

  const fieldCls =
    "w-full bg-white/80 border-2 border-border rounded-2xl px-4 py-3 text-sm text-ink outline-none focus:border-blush transition-colors appearance-none";
  const labelCls =
    "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-light mb-1.5";

  return (
    <form
      onSubmit={submit}
      className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-soft border border-border"
    >
      <div className="grid gap-4">
        <div>
          <label className={labelCls}><MapPin className="w-3 h-3" />From</label>
          <select className={fieldCls} value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="">Select starting point</option>
            <optgroup label="Delhi">
              {zones.delhi.map((z) => <option key={z.id} value={z.name}>{z.name}</option>)}
            </optgroup>
            <optgroup label="Noida">
              {zones.noida.map((z) => <option key={z.id} value={z.name}>{z.name}</option>)}
            </optgroup>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <div className="w-9 h-9 rounded-full bg-gradient-warm flex items-center justify-center shadow-soft">
            <ArrowDown className="w-4 h-4 text-ink" />
          </div>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div>
          <label className={labelCls}><MapPin className="w-3 h-3" />To</label>
          <select className={fieldCls} value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="">Select destination</option>
            <optgroup label="Delhi">
              {zones.delhi.map((z) => <option key={z.id} value={z.name}>{z.name}</option>)}
            </optgroup>
            <optgroup label="Noida">
              {zones.noida.map((z) => <option key={z.id} value={z.name}>{z.name}</option>)}
            </optgroup>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}><Clock className="w-3 h-3" />Time</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}><Users className="w-3 h-3" />Traveller</label>
            <select className={fieldCls} value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="any">Any</option>
              <option value="female">Solo female</option>
              <option value="male">Solo male</option>
              <option value="group">Group</option>
            </select>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-xl">{error}</p>
        )}

        <button
          type="submit"
          className="mt-1 inline-flex items-center justify-center gap-2 bg-ink text-cream rounded-2xl py-3.5 font-semibold text-sm hover:bg-blush transition-colors shadow-soft"
        >
          <Search className="w-4 h-4" />
          Find safe routes
        </button>
      </div>
    </form>
  );
}
