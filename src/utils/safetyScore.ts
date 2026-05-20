import { Cctv } from "lucide-react";

export type Gender = "female" | "male" | "group" | "any";
export type TimeCategory = "day" | "evening" | "night";

// Zone safety profiles — used to adjust route scores based on origin/destination
export const ZONE_SAFETY: Record<string, number> = {
  // Delhi — higher = safer
  "Connaught Place": 88,
  "Khan Market": 87,
  "Defence Colony": 86,
  "Jor Bagh": 85,
  Saket: 85,
  "Lodi Colony": 84,
  "South Extension": 84,
  "Vasant Kunj": 83,
  "Hauz Khas": 82,
  "Greater Kailash": 83,
  "Dilli Haat / INA": 82,
  "Sarojini Nagar": 80,
  Dwarka: 80,
  "Dwarka Sector 21": 81,
  "Rajouri Garden": 79,
  Janakpuri: 78,
  "Lajpat Nagar": 78,
  "Karol Bagh": 74,
  Pitampura: 76,
  "Nehru Place": 76,
  "Mayur Vihar": 75,
  "Malviya Nagar": 80,
  "Patel Nagar": 72,
  Rohini: 72,
  Nizamuddin: 72,
  "Model Town": 76,
  "Preet Vihar": 74,
  "GTB Nagar": 68,
  "Mukherjee Nagar": 70,
  "New Delhi Railway Station": 70,
  Azadpur: 65,
  "ISBT Kashmere Gate": 65,
  "Uttam Nagar": 68,
  "Chandni Chowk": 68,
  "Dilshad Garden": 66,
  Paharganj: 62,
  Shahdara: 62,
  "IGI Airport": 95,

  // Noida — higher = safer
  "Noida City Centre": 84,
  "Sector 18 Noida": 82,
  "Sector 50 Noida": 80,
  "Sector 44 Noida": 76,
  "Sector 37 Noida": 77,
  "Sector 62 Noida": 76,
  "Sector 15 Noida": 75,
  "Botanical Garden": 76,
  "Sector 63 Noida": 74,
  "Sector 76 Noida": 73,
  "Sector 2 Noida": 71,
  "Sector 3 Noida": 72,
  "Sector 1 Noida": 70,
  "Sector 100 Noida": 73,
  "Sector 120 Noida": 72,
  "Sector 108 Noida": 71,
  "Sector 110 Noida": 70,
  "Sector 125 Noida": 71,
  "Sector 137 Noida": 70,
  "Greater Noida": 72,
  "GNIDA Office Area": 74,
  "Greater Noida West": 69,
  "Noida Extension (Gaur City)": 67,
  "Noida Expressway": 68,
};

export function getZoneSafety(zoneName: string): number {
  return ZONE_SAFETY[zoneName] ?? 72; // default to 72 if unknown
}

export function getTimeCategory(hour: number): TimeCategory {
  if (hour >= 6 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

/**
 * Location-aware Safety Score Calculator
 *
 * Base weights:
 *   Lighting   30%
 *   CCTV       25%
 *   Police     25%
 *   Crime      20% (inverted: lower crimeIndex = safer)
 *
 * Then blended with origin + destination zone safety (±5 points max)
 */
export function calculateSafetyScore(opts: {
  lighting: number;
  cctv: number;
  police: number;
  crime: number;
  hour: number;
  gender: Gender;
  fromZone?: string;
  toZone?: string;
}) {
  const { lighting, cctv, police, crime, hour, gender, fromZone, toZone } = opts;
  const cat = getTimeCategory(hour);

  // Base route score
  let base = lighting * 0.3 + cctv * 0.25 + police * 0.25 + (100 - crime) * 0.2;

  // Location adjustment — average safety of origin + destination
  if (fromZone || toZone) {
    const fromSafety = fromZone ? getZoneSafety(fromZone) : 75;
    const toSafety = toZone ? getZoneSafety(toZone) : 75;
    const avgZone = (fromSafety + toSafety) / 2;
    // Blend: 80% route, 20% zone safety
    base = base * 0.8 + avgZone * 0.2;
  }

  // Time-of-day penalties
  if (cat === "evening") base -= 5;
  if (cat === "night") base -= 13;

  // Gender adjustments
  if (gender === "female" && cat === "evening") base -= 4;
  if (gender === "female" && cat === "night") base -= 8;
  if (gender === "group") base += 4;

  return Math.max(5, Math.min(99, Math.round(base)));
}

export function getSafetyLabel(score: number) {
  if (score >= 82) return { label: "Very safe" };
  if (score >= 65) return { label: "Safe" };
  if (score >= 50) return { label: "Caution" };
  return { label: "Risky" };
}

export function getSafetyColor(score: number): string {
  if (score >= 82) return "sage";
  if (score >= 65) return "amber";
  return "destructive";
}

// Returns a human-readable advisory based on score + time + gender
export function getSafetyAdvisory(score: number, cat: TimeCategory, gender: Gender): string | null {
  if (cat === "night" && gender === "female" && score < 70) {
    return "High risk for solo female travel at this hour. Consider delaying or sharing your live location.";
  }
  if (cat === "night" && score < 60) {
    return "This route has low safety at night. Travel with company or wait until morning.";
  }
  if (cat === "evening" && gender === "female" && score < 65) {
    return "Exercise caution on this route in the evening. Stick to main roads and stay in lit areas.";
  }
  if (score >= 82) {
    return "This is one of the safer routes available for your journey.";
  }
  return null;
}
