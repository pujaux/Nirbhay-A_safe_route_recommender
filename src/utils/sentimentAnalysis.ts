// ─────────────────────────────────────────────────────────────────
// Nirbhay — Sentiment Analysis Engine
// NLP-based safety signal extractor from user review text
// ─────────────────────────────────────────────────────────────────

// Safety-positive keywords (increase score)
const POSITIVE_SIGNALS: Record<string, number> = {
  // Lighting
  "well lit": 8,
  "well-lit": 8,
  bright: 6,
  lights: 5,
  lighting: 5,
  illuminated: 7,
  streetlights: 6,
  visibility: 5,
  // Police / Security
  police: 6,
  pcr: 7,
  security: 6,
  patrol: 7,
  safe: 8,
  guard: 5,
  cisf: 8,
  protected: 6,
  monitored: 6,
  // CCTV
  cctv: 7,
  camera: 5,
  cameras: 5,
  surveillance: 6,
  // General positive
  comfortable: 6,
  confident: 5,
  smooth: 4,
  fine: 3,
  good: 4,
  great: 6,
  excellent: 7,
  perfect: 7,
  recommend: 6,
  trusted: 5,
  reliable: 5,
  accurate: 6,
  helpful: 5,
  crowded: 4,
  busy: 4,
  traffic: 3,
  metro: 5,
  station: 4,
};

// Safety-negative keywords (decrease score)
const NEGATIVE_SIGNALS: Record<string, number> = {
  // Darkness
  dark: -8,
  darkness: -8,
  "poorly lit": -9,
  "no lights": -9,
  dim: -6,
  unlit: -8,
  black: -5,
  "pitch dark": -10,
  // Crime / Danger
  unsafe: -9,
  dangerous: -9,
  scary: -8,
  afraid: -8,
  fear: -7,
  risk: -6,
  threat: -7,
  harassed: -10,
  harassment: -10,
  snatching: -10,
  theft: -9,
  crime: -8,
  assault: -10,
  stalked: -10,
  followed: -7,
  suspicious: -6,
  // Isolation
  isolated: -8,
  empty: -6,
  deserted: -8,
  lonely: -6,
  alone: -5,
  "no people": -7,
  "no one": -6,
  abandoned: -7,
  // Poor infrastructure
  broken: -5,
  "no cctv": -7,
  "no police": -8,
  "no patrol": -7,
  avoid: -8,

  bad: -5,
  terrible: -8,
  worst: -9,
  horrible: -8,
  sketchy: -7,
  risky: -7,
  // Time-based
  "late night": -6,
  midnight: -5,
  "after dark": -7,
};

// Time-of-day risk multipliers
const HOUR_RISK: Record<number, number> = {
  0: 1.4,
  1: 1.5,
  2: 1.5,
  3: 1.4,
  4: 1.3,
  5: 1.1,
  6: 0.9,
  7: 0.8,
  8: 0.7,
  9: 0.7,
  10: 0.7,
  11: 0.7,
  12: 0.7,
  13: 0.7,
  14: 0.7,
  15: 0.7,
  16: 0.8,
  17: 0.9,
  18: 1.0,
  19: 1.1,
  20: 1.2,
  21: 1.3,
  22: 1.4,
  23: 1.4,
};

export type SentimentResult = {
  score: number; // -100 to +100
  label: "positive" | "negative" | "neutral";
  confidence: number; // 0-100%
  signals: {
    positive: string[];
    negative: string[];
  };
  safetyDelta: number; // how much this review should adjust route safety score
  summary: string; // human-readable summary
};

export type RiskPattern = {
  hour: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  riskMultiplier: number;
  label: string;
  recommendation: string;
};

// ─── Main sentiment analyser ──────────────────────────────────────
export function analyseReviewSentiment(text: string): SentimentResult {
  const lower = text.toLowerCase();
  let score = 0;
  const foundPositive: string[] = [];
  const foundNegative: string[] = [];

  // Check positive signals
  for (const [keyword, weight] of Object.entries(POSITIVE_SIGNALS)) {
    if (lower.includes(keyword)) {
      score += weight;
      foundPositive.push(keyword);
    }
  }

  // Check negative signals
  for (const [keyword, weight] of Object.entries(NEGATIVE_SIGNALS)) {
    if (lower.includes(keyword)) {
      score += weight; // weight is already negative
      foundNegative.push(keyword);
    }
  }

  // Clamp score to -100 to +100
  score = Math.max(-100, Math.min(100, score));

  // Label
  const label = score > 10 ? "positive" : score < -10 ? "negative" : "neutral";

  // Confidence based on number of signals found
  const totalSignals = foundPositive.length + foundNegative.length;
  const confidence = Math.min(95, totalSignals * 15 + 20);

  // Safety delta — how much to adjust route safety score
  // Max adjustment ±5 points on the safety scale
  const safetyDelta = Math.round((score / 100) * 5 * 10) / 10;

  // Human-readable summary
  const summary = generateSummary(label, foundPositive, foundNegative);

  return {
    score,
    label,
    confidence,
    signals: { positive: foundPositive, negative: foundNegative },
    safetyDelta,
    summary,
  };
}

function generateSummary(
  label: "positive" | "negative" | "neutral",
  positive: string[],
  negative: string[],
): string {
  if (label === "positive") {
    if (positive.includes("well lit") || positive.includes("bright"))
      return "Reviewer confirms good lighting on this route.";
    if (positive.includes("police") || positive.includes("patrol"))
      return "Reviewer noted active police presence.";
    if (positive.includes("cctv") || positive.includes("camera"))
      return "Reviewer confirmed CCTV coverage on this route.";
    if (positive.includes("safe") || positive.includes("comfortable"))
      return "Reviewer felt safe on this route.";
    return "Reviewer had a positive safety experience on this route.";
  }

  if (label === "negative") {
    if (negative.includes("dark") || negative.includes("poorly lit"))
      return "Reviewer reported poor lighting — caution advised.";
    if (negative.includes("harassed") || negative.includes("harassment"))
      return "⚠️ Reviewer reported harassment — avoid this route at night.";
    if (negative.includes("snatching") || negative.includes("theft"))
      return "⚠️ Reviewer reported theft risk on this route.";
    if (negative.includes("isolated") || negative.includes("deserted"))
      return "Reviewer found this route isolated and potentially unsafe.";
    if (negative.includes("unsafe") || negative.includes("dangerous"))
      return "Reviewer rated this route as unsafe.";
    return "Reviewer had safety concerns on this route.";
  }

  return "Reviewer provided neutral feedback about this route.";
}

// ─── Aggregate sentiment from multiple reviews ────────────────────
export function aggregateSentiment(texts: string[]): {
  avgScore: number;
  avgDelta: number;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  topPositiveSignals: string[];
  topNegativeSignals: string[];
  adjustedSafetyBoost: number;
} {
  if (!texts.length) {
    return {
      avgScore: 0,
      avgDelta: 0,
      positiveCount: 0,
      negativeCount: 0,
      neutralCount: 0,
      topPositiveSignals: [],
      topNegativeSignals: [],
      adjustedSafetyBoost: 0,
    };
  }

  const results = texts.map(analyseReviewSentiment);
  const avgScore = results.reduce((a, r) => a + r.score, 0) / results.length;
  const avgDelta =
    results.reduce((a, r) => a + r.safetyDelta, 0) / results.length;

  const positiveCount = results.filter((r) => r.label === "positive").length;
  const negativeCount = results.filter((r) => r.label === "negative").length;
  const neutralCount = results.filter((r) => r.label === "neutral").length;

  // Collect all signals
  const allPositive = results.flatMap((r) => r.signals.positive);
  const allNegative = results.flatMap((r) => r.signals.negative);

  // Count frequency
  const posFreq = countFrequency(allPositive);
  const negFreq = countFrequency(allNegative);

  const topPositiveSignals = Object.entries(posFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k);

  const topNegativeSignals = Object.entries(negFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k);

  // Adjusted safety boost — capped at ±5 points
  const adjustedSafetyBoost = Math.max(
    -5,
    Math.min(5, Math.round(avgDelta * 10) / 10),
  );

  return {
    avgScore: Math.round(avgScore),
    avgDelta,
    positiveCount,
    negativeCount,
    neutralCount,
    topPositiveSignals,
    topNegativeSignals,
    adjustedSafetyBoost,
  };
}

function countFrequency(arr: string[]): Record<string, number> {
  return arr.reduce(
    (acc, val) => ({ ...acc, [val]: (acc[val] || 0) + 1 }),
    {} as Record<string, number>,
  );
}

// ─── Time-series risk pattern engine ─────────────────────────────
export function getRiskPattern(hour: number): RiskPattern {
  const multiplier = HOUR_RISK[hour] ?? 1.0;

  if (multiplier >= 1.4) {
    return {
      hour,
      riskLevel: "critical",
      riskMultiplier: multiplier,
      label: "Late night — highest risk",
      recommendation:
        "Avoid solo travel. Share location with trusted contact. Prefer cab over auto.",
    };
  }
  if (multiplier >= 1.2) {
    return {
      hour,
      riskLevel: "high",
      riskMultiplier: multiplier,
      label: "Night — elevated risk",
      recommendation:
        "Stick to main roads only. Metro preferred if available. Avoid isolated stretches.",
    };
  }
  if (multiplier >= 1.0) {
    return {
      hour,
      riskLevel: "medium",
      riskMultiplier: multiplier,
      label: "Evening — moderate risk",
      recommendation:
        "Stay on well-lit routes. Metro is safest option before 11 PM.",
    };
  }
  return {
    hour,
    riskLevel: "low",
    riskMultiplier: multiplier,
    label: "Daytime — low risk",
    recommendation: "Good time to travel. Normal precautions apply.",
  };
}

// Get risk for all 24 hours — used for chart
export function getAllHourRisks(): RiskPattern[] {
  return Array.from({ length: 24 }, (_, i) => getRiskPattern(i));
}

// Adjust a safety score based on time risk
export function applyTimeRisk(baseScore: number, hour: number): number {
  const pattern = getRiskPattern(hour);
  const adjusted = baseScore / pattern.riskMultiplier;
  return Math.max(5, Math.min(99, Math.round(adjusted)));
}
