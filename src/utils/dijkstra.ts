// src/utils/dijkstra.ts
// Dijkstra over ROUTES (not waypoints) — picks the optimal route by
// safety-weighted distance. Works with your existing routes.json shape.

export interface RouteForGraph {
  id: string;
  distanceKm?: number | null;
  safety: { lighting: number; cctv: number; police: number };
  via: string[];
}

export interface DijkstraResult {
  rankedIds: string[]; // route IDs sorted best → worst
  bestId: string; // top pick
  weights: Record<string, number>; // id → weight value (lower = better)
}

/**
 * Edge weight: lower = better (safer + shorter).
 * safetyPenalty doubles distance cost when fully unsafe.
 */
export function routeWeight(r: RouteForGraph): number {
  const avgSafety = (r.safety.lighting + r.safety.cctv + r.safety.police) / 3;
  const safetyPenalty = (100 - avgSafety) / 100; // 0 (safe) → 1 (dangerous)
  const distance = r.distanceKm ?? 10; // default 10km if null
  return Math.round(distance * (1 + safetyPenalty * 2) * 10) / 10;
}

/**
 * Dijkstra over a virtual graph where:
 *   - START node  = "origin"
 *   - END node    = "destination"
 *   - Each route  = an edge connecting origin → destination
 *
 * This correctly models your data: multiple parallel route options
 * between two places, each with different safety/distance tradeoffs.
 */
export function dijkstra(routes: RouteForGraph[]): DijkstraResult {
  // Sort routes by weight (Dijkstra picks minimum weight path)
  const sorted = [...routes].sort((a, b) => routeWeight(a) - routeWeight(b));

  const weights: Record<string, number> = {};
  for (const r of sorted) {
    weights[r.id] = routeWeight(r);
  }

  return {
    rankedIds: sorted.map((r) => r.id),
    bestId: sorted[0]?.id ?? "",
    weights,
  };
}
