import { useEffect, useRef } from "react";

export function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      const hotspots = [
        {
          name: "Ghazipur Underpass",
          lat: 28.6219,
          lng: 77.3156,
          reason: "Poor lighting, snatching reports",
        },
        {
          name: "NH-24 Service Road",
          lat: 28.635,
          lng: 77.328,
          reason: "Isolated, dark, no police",
        },
        {
          name: "Shakarpur Back Lanes",
          lat: 28.6389,
          lng: 77.295,
          reason: "Narrow lanes, harassment cases",
        },
        {
          name: "Kalindi Kunj East",
          lat: 28.5431,
          lng: 77.3106,
          reason: "No lighting, no police at night",
        },
        {
          name: "Noida Expressway Service Rd",
          lat: 28.5274,
          lng: 77.3649,
          reason: "Very isolated, few exits",
        },
        {
          name: "Shahdara Market Area",
          lat: 28.6702,
          lng: 77.2887,
          reason: "Crowding, pickpocketing",
        },
        {
          name: "Rohini Sector 3 Back Roads",
          lat: 28.7362,
          lng: 77.1048,
          reason: "Minimal lighting",
        },
        {
          name: "Okhla Industrial Back Lanes",
          lat: 28.5355,
          lng: 77.2756,
          reason: "Deserted after factory hours",
        },
        { name: "GTB Nagar Metro Exit 2", lat: 28.7006, lng: 77.2056, reason: "Poorly lit lane" },
        {
          name: "Sector 62 Industrial Pocket",
          lat: 28.627,
          lng: 77.3635,
          reason: "Empties after 9 PM",
        },
      ];

      const safeZones = [
        { name: "Connaught Place", lat: 28.6315, lng: 77.2167 },
        { name: "Khan Market", lat: 28.5994, lng: 77.2272 },
        { name: "Lajpat Nagar", lat: 28.5677, lng: 77.2432 },
        { name: "Noida City Centre", lat: 28.5756, lng: 77.3588 },
        { name: "Sector 18 Noida", lat: 28.5706, lng: 77.3219 },
        { name: "Defence Colony", lat: 28.5732, lng: 77.2311 },
        { name: "South Extension", lat: 28.5687, lng: 77.2187 },
        { name: "Saket", lat: 28.5244, lng: 77.2066 },
      ];

      const map = L.map(mapRef.current).setView([28.58, 77.209], 11);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

      // Red warning icon for hotspots
      const warningIcon = L.divIcon({
        html: `<div style="
          background: #ef4444;
          width: 20px;
          height: 25px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        "></div>`,
        iconSize: [20, 20],
        iconAnchor: [14, 28],
        className: "",
      });

      // Add hotspot markers
      hotspots.forEach((spot) => {
        L.marker([spot.lat, spot.lng], { icon: warningIcon }).addTo(map).bindPopup(`
            <div style="font-family: sans-serif; min-width: 180px;">
              <div style="font-weight: bold; color: #ef4444; margin-bottom: 4px;">
                ⚠️ ${spot.name}
              </div>
              <div style="font-size: 12px; color: #555;">
                ${spot.reason}
              </div>
              <div style="font-size: 11px; color: #999; margin-top: 4px;">
                🕐 Active at night
              </div>
            </div>
          `);
      });

      // Add green safe zone circles
      safeZones.forEach((zone) => {
        L.circle([zone.lat, zone.lng], {
          radius: 500,
          color: "#15803d",
          fillColor: "#16a34a",
          fillOpacity: 0.4,
          weight: 4,
        }).addTo(map).bindPopup(`
            <div style="font-family: sans-serif;">
              <div style="font-weight: bold; color: #22c55e;">
                ✅ ${zone.name}
              </div>
              <div style="font-size: 12px; color: #555; margin-top: 4px;">
                Safe zone — well lit, police presence
              </div>
            </div>
          `);
      });
      // Route polylines
      const routes = [
        {
          name: "Blue Line Metro",
          color: "#3b82f6",
          score: 95,
          coords: [
            [28.5921, 77.0407], // Dwarka Sec 21
            [28.6139, 77.209], // Rajiv Chowk / CP
            [28.6127, 77.2773], // Akshardham
            [28.605, 77.31], // Mayur Vihar
            [28.5839, 77.3271], // Noida Electronic City
            [28.5756, 77.3588], // Noida City Centre
          ] as [number, number][],
        },
        {
          name: "DND Flyway via Ring Road",
          color: "#22c55e",
          score: 88,
          coords: [
            [28.6139, 77.209], // Connaught Place
            [28.5994, 77.2272], // Khan Market
            [28.5732, 77.2311], // Defence Colony
            [28.563, 77.253], // Lajpat Nagar
            [28.55, 77.28], // DND Entry
            [28.545, 77.31], // DND Flyway
            [28.5706, 77.3219], // Sector 18 Noida
          ] as [number, number][],
        },
        {
          name: "NH-24 via Akshardham",
          color: "#f97316",
          score: 58,
          coords: [
            [28.6139, 77.209], // Connaught Place
            [28.627, 77.25], // ITO
            [28.6127, 77.2773], // Akshardham
            [28.6219, 77.3156], // Ghazipur Underpass ⚠️
            [28.635, 77.328], // NH-24 Service Road ⚠️
            [28.627, 77.3635], // Sector 62 Noida
          ] as [number, number][],
        },
        {
          name: "Kalindi Kunj Bridge Route",
          color: "#ef4444",
          score: 48,
          coords: [
            [28.6139, 77.209], // Connaught Place
            [28.5687, 77.2187], // South Extension
            [28.5355, 77.2756], // Okhla Industrial ⚠️
            [28.5431, 77.3106], // Kalindi Kunj ⚠️
            [28.5274, 77.331], // Noida Entry
            [28.5706, 77.3219], // Sector 18 Noida
          ] as [number, number][],
        },
        {
          name: "Inner City via South Ex",
          color: "#22c55e",
          score: 85,
          coords: [
            [28.6139, 77.209], // Connaught Place
            [28.5994, 77.2272], // Khan Market
            [28.5732, 77.2311], // Defence Colony
            [28.5687, 77.2187], // South Extension
            [28.5244, 77.2066], // Saket
            [28.5355, 77.2756], // Okhla
            [28.55, 77.31], // DND Entry
            [28.5706, 77.3219], // Sector 18 Noida
          ] as [number, number][],
        },
        {
          name: "Noida Expressway Route",
          color: "#f59e0b",
          score: 65,
          coords: [
            [28.6139, 77.209], // Connaught Place
            [28.5687, 77.2187], // South Extension
            [28.5244, 77.2066], // Saket
            [28.502, 77.22], // Expressway Entry
            [28.495, 77.28], // Noida Expressway
            [28.47, 77.32], // Sector 137 Noida
            [28.5274, 77.3649], // Sector 100 Noida
          ] as [number, number][],
        },
      ];

      routes.forEach((route) => {
        L.polyline(route.coords, {
          color: route.color,
          weight: 5,
          opacity: 0.8,
        }).addTo(map).bindPopup(`
      <div style="font-family: sans-serif; min-width: 180px;">
        <div style="font-weight: bold; color: ${route.color}; margin-bottom: 4px;">
          🛣️ ${route.name}
        </div>
        <div style="font-size: 12px; color: #555;">
          Safety score: <strong>${route.score}/100</strong>
        </div>
      </div>
    `);
      });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        height: "clamp(280px, 50vw, 450px)",
        width: "100%",
        borderRadius: "0",
      }}
    />
  );
}
