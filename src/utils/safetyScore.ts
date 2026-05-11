export type Gender = "female" | "male" | "group" | "any";
export type TimeCategory = "day" | "evening" | "night";

export function getTimeCategory(hour: number): TimeCategory {
  if (hour >= 6 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

export function calculateSafetyScore(opts: {
  lighting: number; cctv: number; police: number; crime: number;
  hour: number; gender: Gender;
}) {
  const { lighting, cctv, police, crime, hour, gender } = opts;
  const cat = getTimeCategory(hour);
  let base = lighting * 0.3 + cctv * 0.25 + police * 0.25 + (100 - crime) * 0.2;
  if (cat === "evening") base -= 6;
  if (cat === "night") base -= 14;
  if (gender === "female" && cat !== "day") base -= 4;
  if (gender === "group") base += 3;
  return Math.max(5, Math.min(99, Math.round(base)));
}

export function getSafetyLabel(score: number) {
  if (score >= 80) return { label: "Very safe" };
  if (score >= 65) return { label: "Safe" };
  if (score >= 50) return { label: "Caution" };
  return { label: "Risky" };
}
