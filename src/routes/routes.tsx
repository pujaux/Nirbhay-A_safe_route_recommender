import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import routesData from "@/data/routes.json";
import {
  calculateSafetyScore,
  getSafetyLabel,
  getSafetyAdvisory,
  getTimeCategory,
  type Gender,
} from "@/utils/safetyScore";
import { RouteSearch } from "@/components/RouteSearch";
import {
  ArrowLeft,
  Star,
  Train,
  Moon,
  Sunset,
  ShieldCheck,
  AlertTriangle,
  Clock,
  MapPin,
  Info,
} from "lucide-react";

const searchSchema = z.object({
  from: z.string().optional().default(""),
  to: z.string().optional().default(""),
  time: z.string().optional().default("18:00"),
  gender: z.enum(["female", "male", "group", "any"]).optional().default("any"),
});

export const Route = createFileRoute("/routes")({
  validateSearch: searchSchema,
  component: RoutesPage,
});

function Bar({ label, value }: { label: string; value: number }) {
  const tone = value >= 80 ? "bg-sage" : value >= 60 ? "bg-amber" : "bg-destructive";
  return (
    <div className="mb-2.5">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-ink-light">{label}</span>
        <span className="font-semibold text-ink">{value}%</span>
      </div>
      <div className="h-1.5 bg-cream-dark rounded-full overflow-hidden">
        <div
          className={`h-full ${tone} rounded-full transition-all duration-700`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 82 ? "text-sage" : score >= 65 ? "text-amber" : "text-destructive";
  const bg = score >= 82 ? "bg-sage/10" : score >= 65 ? "bg-sun-soft" : "bg-destructive/10";
  return (
    <div className={`${bg} rounded-2xl px-4 py-3 text-center min-w-20`}>
      <div className={`font-display text-3xl font-black leading-none ${color}`}>{score}%</div>
      <div className={`text-[10px] font-semibold mt-1 ${color}`}>{getSafetyLabel(score).label}</div>
    </div>
  );
}

function RoutesPage() {
  const { from, to, time, gender } = Route.useSearch();
  const hasSearch = from && to;
  const hour = parseInt((time || "18:00").split(":")[0]);
  const cat = getTimeCategory(hour);
  const isNight = cat === "night";
  const isEvening = cat === "evening";

  const ranked = useMemo(() => {
    return routesData.routes
      .filter((r) => !(r.type === "metro" && isNight))
      .map((r) => {
        const score = calculateSafetyScore({
          lighting: r.safety.lighting,
          cctv: r.safety.cctv,
          police: r.safety.police,
          crime: r.safety.crimeIndex,
          hour,
          gender: gender as Gender,
          fromZone: from, // ← location-aware
          toZone: to, // ← location-aware
        });
        const advisory = getSafetyAdvisory(score, cat, gender as Gender);
        return {
          ...r,
          score,
          safetyLabel: getSafetyLabel(score).label,
          duration: (r.durationMins as Record<string, number | null>)[cat] ?? r.durationMins.day,
          advisory,
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [hour, gender, isNight, cat, from, to]);

  const genderLabel: string = (
    { female: "Solo female", male: "Solo male", group: "Group", any: "Any traveller" } as Record<
      string,
      string
    >
  )[gender];

  // Score difference between best and worst route
  const scoreDiff = ranked.length > 1 ? ranked[0].score - ranked[ranked.length - 1].score : 0;

  if (!hasSearch) {
    return (
      <div className="max-w-2xl mx-auto px-5 pt-12 pb-16">
        <div className="text-center mb-8 animate-fadeUp">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blush">
            Plan your walk
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-ink mt-2 leading-tight">
            Where to <span className="italic text-blush">today?</span>
          </h1>
          <p className="mt-3 text-ink-light">
            Pick a start and destination, and we'll rank the safest routes.
          </p>
        </div>
        <div className="animate-fadeUp delay-1">
          <RouteSearch />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 pt-8 pb-16">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-ink-light hover:text-blush mb-5"
      >
        <ArrowLeft className="w-4 h-4" /> Back home
      </Link>

      {/* Route header card */}
      <div className="bg-white/80 backdrop-blur border border-border rounded-3xl p-6 sm:p-7 mb-5 animate-fadeUp shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-blush">
              Your route
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-1 leading-tight">
              {from}
              <br />
              <span className="text-blush">→</span> {to}
            </h1>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            <span className="inline-flex items-center gap-1 text-xs bg-cream-dark text-ink px-2.5 py-1 rounded-full">
              <Clock className="w-3 h-3" /> {time}
            </span>
            <span className="text-xs bg-cream-dark text-ink px-2.5 py-1 rounded-full">
              {genderLabel}
            </span>
            {isNight && (
              <span className="inline-flex items-center gap-1 text-xs bg-sun-soft text-amber px-2.5 py-1 rounded-full font-semibold">
                <Moon className="w-3 h-3" /> Night mode
              </span>
            )}
            {isEvening && !isNight && (
              <span className="inline-flex items-center gap-1 text-xs bg-sun-soft text-amber px-2.5 py-1 rounded-full font-semibold">
                <Sunset className="w-3 h-3" /> Evening
              </span>
            )}
          </div>
        </div>

        {/* Score spread indicator */}
        {ranked.length > 1 && (
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
            <Info className="w-4 h-4 text-ink-light shrink-0" />
            <p className="text-xs text-ink-light">
              Safety scores for this journey range from{" "}
              <span className="font-semibold text-ink">{ranked[ranked.length - 1].score}%</span> to{" "}
              <span className="font-semibold text-ink">{ranked[0].score}%</span>
              {scoreDiff >= 15 && (
                <span className="text-blush font-medium">
                  {" "}
                  — significant difference, choose carefully.
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Night advisory */}
      {isNight && (
        <div className="bg-sun-soft border border-sun rounded-2xl p-4 mb-5 flex gap-3 animate-fadeUp delay-1">
          <Moon className="w-5 h-5 text-amber shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-ink">Night travel advisory</p>
            <p className="text-ink-light mt-1">
              Stick to main roads. Avoid shortcuts and underpasses.
              {gender === "female" && " Share your live location with a trusted contact."} Metro
              unavailable after 11 PM.
            </p>
          </div>
        </div>
      )}

      {/* Evening advisory */}
      {isEvening && !isNight && (
        <div className="bg-sun-soft border border-sun rounded-2xl p-3 mb-5 flex gap-2 animate-fadeUp delay-1">
          <Sunset className="w-4 h-4 text-amber shrink-0 mt-0.5" />
          <p className="text-sm text-ink-light">
            Evening hours — traffic is high. Metro is the safer option before 11 PM.
          </p>
        </div>
      )}

      {/* Route cards */}
      <div className="space-y-4">
        {ranked.map((r, i) => (
          <div
            key={r.id}
            className={`animate-fadeUp bg-white/90 backdrop-blur rounded-3xl p-5 sm:p-6 transition-shadow ${
              i === 0 ? "border-2 border-blush shadow-soft" : "border border-border"
            }`}
            style={{ animationDelay: `${0.1 + i * 0.08}s` }}
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {i === 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blush text-white px-2.5 py-1 rounded-full">
                  <Star className="w-3 h-3 fill-white" /> Recommended
                </span>
              )}
              {r.type === "metro" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-sun-soft text-amber px-2.5 py-1 rounded-full">
                  <Train className="w-3 h-3" /> Metro
                </span>
              )}
              {i === ranked.length - 1 && ranked.length > 2 && (
                <span className="text-[11px] font-semibold bg-cream-dark text-ink-light px-2.5 py-1 rounded-full">
                  Least safe option
                </span>
              )}
            </div>

            {/* Title + Score */}
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="flex-1">
                <p className="font-semibold text-ink">{r.shortName}</p>
                <p className="text-xs text-ink-light mt-1 leading-relaxed">{r.via.join(" → ")}</p>
              </div>
              <ScoreRing score={r.score} />
            </div>

            {/* Stats */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 bg-cream rounded-xl py-2.5 text-center">
                <div className="text-base font-bold text-ink">{r.duration} min</div>
                <div className="text-[10px] text-ink-light uppercase tracking-wide">duration</div>
              </div>
              {r.distanceKm && (
                <div className="flex-1 bg-cream rounded-xl py-2.5 text-center">
                  <div className="text-base font-bold text-ink">{r.distanceKm} km</div>
                  <div className="text-[10px] text-ink-light uppercase tracking-wide">distance</div>
                </div>
              )}
              {r.type === "metro" && "metroTiming" in r && (
                <div className="flex-1 bg-sun-soft rounded-xl py-2.5 text-center">
                  <div className="text-xs font-bold text-amber">
                    {(r as { metroTiming: { lastTrain: string } }).metroTiming.lastTrain}
                  </div>
                  <div className="text-[10px] text-ink-light uppercase tracking-wide">
                    last train
                  </div>
                </div>
              )}
            </div>

            {/* Safety bars */}
            <Bar label="Street lighting" value={r.safety.lighting} />
            <Bar label="CCTV coverage" value={r.safety.cctv} />
            <Bar label="Police presence" value={r.safety.police} />

            {/* Advisory message */}
            {r.advisory && (
              <div
                className={`rounded-2xl p-3 mt-3 flex gap-2 ${
                  r.score >= 82 ? "bg-sage/10" : r.score >= 65 ? "bg-sun-soft" : "bg-destructive/10"
                }`}
              >
                <Info
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    r.score >= 82 ? "text-sage" : r.score >= 65 ? "text-amber" : "text-destructive"
                  }`}
                />
                <p
                  className={`text-xs leading-relaxed ${
                    r.score >= 82 ? "text-sage" : r.score >= 65 ? "text-amber" : "text-destructive"
                  }`}
                >
                  {r.advisory}
                </p>
              </div>
            )}

            {/* Route notes */}
            {r.safety.notes?.length > 0 && (
              <div className="bg-blush-soft/40 rounded-2xl p-3 mt-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-light mb-1.5">
                  Route notes
                </p>
                {r.safety.notes.slice(0, 3).map((n, idx) => (
                  <p key={idx} className="text-xs text-ink leading-relaxed flex gap-1.5">
                    <span className="text-blush">•</span>
                    {n}
                  </p>
                ))}
              </div>
            )}

            {/* Hotspots */}
            {r.hotspots && r.hotspots.length > 0 && (
              <div className="bg-destructive/10 rounded-2xl p-3 mt-2 flex gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-semibold text-destructive">Avoid these spots</p>
                  {r.hotspots.map((h, idx) => (
                    <p key={idx} className="text-xs text-destructive/90">
                      {h}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Safe zones */}
            {r.safezones && r.safezones.length > 0 && (
              <p className="text-xs text-sage mt-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Safe stops: {r.safezones.join(" · ")}
              </p>
            )}
          </div>
        ))}

        {ranked.length === 0 && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-3xl p-8 text-center">
            <p className="font-semibold text-destructive">No safe routes at this hour</p>
            <p className="text-sm text-destructive/80 mt-1">
              It's very late. Wait until morning or travel with company.
            </p>
          </div>
        )}
      </div>

      {/* Search another route */}
      <div className="mt-10">
        <p className="text-xs uppercase tracking-wider font-semibold text-ink-light mb-3 flex items-center gap-1.5">
          <MapPin className="w-3 h-3" /> Plan another route
        </p>
        <RouteSearch />
      </div>
    </div>
  );
}
