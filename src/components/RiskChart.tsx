import { getAllHourRisks } from "@/utils/sentimentAnalysis";
import { Clock } from "lucide-react";

const RISK_COLORS = {
  low: { bar: "bg-sage", text: "text-sage", bg: "bg-sage/10" },
  medium: { bar: "bg-amber", text: "text-amber", bg: "bg-sun-soft" },
  high: { bar: "bg-orange-500", text: "text-orange-500", bg: "bg-orange-50" },
  critical: {
    bar: "bg-destructive",
    text: "text-destructive",
    bg: "bg-destructive/10",
  },
};

function formatHour(hour: number): string {
  if (hour === 0) return "12am";
  if (hour === 12) return "12pm";
  return hour < 12 ? `${hour}am` : `${hour - 12}pm`;
}

export function RiskChart() {
  const risks = getAllHourRisks();
  const currentHour = new Date().getHours();
  const currentRisk = risks[currentHour];
  const colors = RISK_COLORS[currentRisk.riskLevel];

  return (
    <div className="bg-white/90 border border-border rounded-3xl p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-blush" />
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-light">
              24-Hour Risk Pattern
            </p>
          </div>
          <p className="font-display text-xl font-bold text-ink">
            When is Delhi safest?
          </p>
          <p className="text-xs text-ink-light mt-1">
            Based on crime data, lighting patterns, and police patrol schedules
          </p>
        </div>

        {/* Current hour badge */}
        <div
          className={`${colors.bg} rounded-2xl px-3 py-2 text-center shrink-0`}
        >
          <p
            className={`text-[10px] font-semibold uppercase tracking-wide ${colors.text}`}
          >
            Right now
          </p>
          <p
            className={`font-display text-lg font-black leading-none mt-0.5 ${colors.text}`}
          >
            {formatHour(currentHour)}
          </p>
          <p className={`text-[10px] font-semibold mt-0.5 ${colors.text}`}>
            {currentRisk.label.split("—")[0].trim()}
          </p>
        </div>
      </div>

      {/* Bar chart — 24 hours */}
      <div className="flex items-end gap-0.5 h-20 mb-2">
        {risks.map((r) => {
          const height = Math.round(r.riskMultiplier * 40);
          const isNow = r.hour === currentHour;
          const c = RISK_COLORS[r.riskLevel];

          return (
            <div
              key={r.hour}
              className="flex-1 flex flex-col items-center justify-end group relative"
              title={`${formatHour(r.hour)}: ${r.label}`}
            >
              <div
                className={`w-full rounded-sm transition-all ${c.bar} ${
                  isNow
                    ? "opacity-100 ring-2 ring-offset-1 ring-current"
                    : "opacity-60 group-hover:opacity-100"
                }`}
                style={{ height: `${height}px` }}
              />
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block z-10 pointer-events-none">
                <div className="bg-ink text-cream text-[9px] px-2 py-1 rounded-lg whitespace-nowrap">
                  {formatHour(r.hour)}: {r.riskLevel}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hour labels — show every 6 hours */}
      <div className="flex justify-between text-[9px] text-ink-light mb-4">
        <span>12am</span>
        <span>6am</span>
        <span>12pm</span>
        <span>6pm</span>
        <span>12am</span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        {(["low", "medium", "high", "critical"] as const).map((level) => (
          <div key={level} className="flex items-center gap-1.5">
            <div
              className={`w-2.5 h-2.5 rounded-sm ${RISK_COLORS[level].bar}`}
            />
            <span className="text-[10px] text-ink-light capitalize">
              {level}
            </span>
          </div>
        ))}
      </div>

      {/* Current advisory */}
      <div className={`${colors.bg} rounded-2xl p-3`}>
        <p className={`text-xs font-semibold ${colors.text} mb-1`}>
          {currentRisk.label}
        </p>
        <p className="text-xs text-ink-light leading-relaxed">
          {currentRisk.recommendation}
        </p>
      </div>

      {/* Key insights */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { time: "6am–5pm", label: "Safest", color: "bg-sage/10 text-sage" },
          {
            time: "8pm–10pm",
            label: "Caution",
            color: "bg-sun-soft text-amber",
          },
          {
            time: "10pm–5am",
            label: "High risk",
            color: "bg-destructive/10 text-destructive",
          },
        ].map((item) => (
          <div
            key={item.time}
            className={`${item.color} rounded-xl px-2 py-2 text-center`}
          >
            <p className="text-[10px] font-bold">{item.label}</p>
            <p className="text-[9px] opacity-80 mt-0.5">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
