__🛡️ Nirbhay (Fearless)__
Every street, every hour.
Nirbhay is a safe-route recommender designed to ensure that no one has to think twice before walking home. By combining real-time community reports with safety data, it transforms the way we navigate our cities—moving from "shortest path" to "safest path."
<img width="1366" height="768" alt="Screenshot (1165)" src="https://github.com/user-attachments/assets/f4c4fd97-793c-4799-a2ad-97b820f4b13c" />


__Why Nirbhay?__
In many cities, the sun setting shouldn't mean a loss of freedom. Most navigation apps prioritize speed, often leading users through poorly lit or isolated areas.

Nirbhay (meaning Fearless) was built to:

Empower pedestrians with data-backed route choices.

Surface community-driven safety reports (CCTV, lighting, crowds).

Keep help just one tap away with an integrated SOS system.


__Features__
Safety-First Routing: Algorithms that weigh street lighting and historical safety data over just distance.

Community Watch: Real-time reporting of hotspots or safe zones by the people who live there.

SOS Integration: Quick access to emergency contacts and local authorities.

Inclusive Design: Specific route scoring for solo travelers, groups, and different times of day.


__Design Philosophy__
The app uses a warm, grounding palette to provide a sense of security during high-stress moments:

Sun (#FFD700): Representing light and clarity.

Blush: For empathy and human-centric design.

Ink: For deep, readable contrast.
<img width="1366" height="768" alt="Screenshot (1169)" src="https://github.com/user-attachments/assets/438e4d30-460d-4e55-8f39-3d9b50b95549" />

<img width="1366" height="768" alt="Screenshot (1170)" src="https://github.com/user-attachments/assets/9b051bc2-80eb-4f0e-8a2c-99adffcf28cf" />

<img width="1366" height="768" alt="Screenshot (1171)" src="https://github.com/user-attachments/assets/aedfec14-18ff-4893-890e-f23e3d87c22d" />

<img width="1366" height="768" alt="Screenshot (1168)" src="https://github.com/user-attachments/assets/f4e7e23a-9aad-44f7-bbed-dd72de6d84c2" />



## 🗺️ Interactive Safety Map 

__What the map shows__

**🔴 Crime Hotspot Markers (10 zones)**
Real danger zones identified from Delhi Police reports, news archives, and Reddit r/delhi community reports. Click any marker to see the danger reason and active hours.

| Hotspot | Risk Level |
|--------|------------|
| Ghazipur Underpass | High — poor lighting, snatching |
| NH-24 Service Road | High — isolated, no police |
| Shakarpur Back Lanes | High — harassment cases |
| Kalindi Kunj East | High — no lighting at night |
| Noida Expressway Service Rd | High — very isolated |
| Shahdara Market | Medium — crowding, pickpocketing |
| Rohini Sector 3 | Medium — minimal lighting |
| Okhla Industrial Lanes | Medium — deserted after hours |
| GTB Nagar Metro Exit 2 | Medium — poorly lit lane |
| Sector 62 Industrial Pocket | Medium — empties after 9 PM |

**🟢 Safe Zone Overlays (8 zones)**
Green circles mark well-lit, police-patrolled areas with high CCTV coverage — Connaught Place, Khan Market, Defence Colony, South Extension, Saket, Noida City Centre, Sector 18 Noida, and Lajpat Nagar.

**🛣️ Route Polylines (6 corridors)**
All 6 Delhi–Noida routes drawn with safety color coding:

| Route | Color | Safety Score |
|-------|-------|-------------|
| Blue Line Metro | 🔵 Blue | 95/100 |
| DND Flyway via Ring Road | 🟢 Green | 88/100 |
| Inner City via South Ex | 🟢 Green | 85/100 |
| Noida Expressway | 🟡 Amber | 65/100 |
| NH-24 via Akshardham | 🟠 Orange | 58/100 |
| Kalindi Kunj Bridge | 🔴 Red | 48/100 |

### Why Leaflet over Google Maps
Google Maps API charges after $200/month free credit — a billing risk for a student project. Leaflet.js with OpenStreetMap is 100% free forever and used in production by Wikipedia and Facebook.

<img width="1366" height="768" alt="Screenshot (1240)" src="https://github.com/user-attachments/assets/dfd685d7-4ba3-4cb8-8334-7a955b2971a8" />


__Tech Stack__
Framework: React / Vite

Styling: Tailwind CSS v4

Language: TypeScript (Strictly typed for reliability)

Routing: TanStack Router

Map:  Leaflet.js + OpenStreetMap



__🚀 Future Scope__
1. Transition to an ML-Powered SystemWhile the current version uses a manual formula, the next phase involves upgrading to a Machine Learning layer.  Predictive Modeling: Instead of static weights, you can train Random Forest or XGBoost models to predict area safety scores.  Feature Expansion: The model can learn from complex features like crime counts, lighting, proximity to police, and specific area types (e.g., commercial vs. residential).  Dynamic Labeling: Implementing safety labels derived from historical crime severity data to provide more nuanced routing.
  
2. Integration of Real-Time Safety SignalsTo make the app more "impressive" and research-worthy, you can incorporate additional live data points:  Crowd Density: Approximating population or crowd density based on the time of day using OSM area type tags.  Infrastructure Data: Incorporating municipal open data portals to track real-time street light density and maintenance.  Police Proximity: Refining the road graph to prioritize proximity to police stations extracted directly from OpenStreetMap.
     
3. Advanced Routing & User PersonalizationThe core algorithm can be further tuned to offer a more tailored experience:Balanced Mode: Refining the "Balanced Route" which intelligently combines safety scores with distance to ensure users aren't taking unnecessarily long detours.  Automated Weight Tuning: Moving beyond manual weight settings ($w1, w2, etc.$) to a system where weights are learned or tuned based on user feedback—a great point to mention in professional evaluations or vivas.
  
4. Expansion of Geospatial IntelligenceScale: Expanding the road network graph beyond a single city (like delhi or noida) to a national level using the OSMnx library.  Granular Mapping: Using GeoPandas to perform even more precise geospatial joins, mapping specific crime incidents to the exact nearest road segments for pinpoint accuracy.  
