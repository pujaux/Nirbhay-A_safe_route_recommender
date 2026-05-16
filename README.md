## 🛡️ Nirbhay (Fearless)
निर्भय · Safe Route Recommender for Delhi & Noida

A web app that recommends the safest travel routes across Delhi and Noida — ranked by street lighting, CCTV coverage, police presence, and crime data. Scores adapt dynamically based on time of day, traveller profile, and real community reviews analysed with NLP.


<img width="1181" height="611" alt="Screenshot (1273)" src="https://github.com/user-attachments/assets/0dbee46b-b789-483a-bc7a-584dc6de094f" />




## Why Nirbhay?
In many cities, the sun setting shouldn't mean a loss of freedom. Most navigation apps prioritize speed, often leading users through poorly lit or isolated areas.

Nirbhay (meaning Fearless) was built to:

Empower pedestrians with data-backed route choices.

Surface community-driven safety reports (CCTV, lighting, crowds).

Keep help just one tap away with an integrated SOS system.


## ✨ Live Features

🗺️__FeatureDescription__
Route SearchSearch between 62 locations across Delhi & Noida.

🔢 __Safety Scoring__
Weighted algorithm: lighting (30%) + CCTV (25%) + police (25%) + crime (20%).

📍 __Location-awareScores__
adjust based on origin & destination zone safety

🌙 __Time-of-day mode__
Night penalties, evening advisories, metro availability

👩 __Gender filter__
Solo female travel gets stricter scoring and warnings

🗺️ __Live Map__
Leaflet.js + OpenStreetMap with route polylines, hotspot markers, safe zone overlays

🚨 __SOS Button__
Floating emergency contacts panel — tap to call 100, 1091, 112

⚠️ __Smart Alerts__
Auto banner based on current time — night/evening/day advisories

💬 __Firebase Reviews__
Community reviews stored in Firestore — real-time, persistent

🧠 ___NLP Sentiment Analysis__
Reviews analysed with keyword-weighted NLP engine — extracts safety signals

📊 __24-Hour Risk Chart__
Visual risk pattern showing safest and riskiest hours across Delhi

🔔 __ML Safety Insights__
Aggregate sentiment adjusts route safety scores based on community feedback



<img width="1316" height="600" alt="Screenshot (1242)" src="https://github.com/user-attachments/assets/1fc0b8c6-4fe9-4be2-892d-dea07868bfc0" />


<img width="1320" height="598" alt="Screenshot (1243)" src="https://github.com/user-attachments/assets/983fc7ea-e29a-448c-b976-70fd8dc60c98" />



<img width="1325" height="500" alt="Screenshot (1244)" src="https://github.com/user-attachments/assets/313f0e67-848e-4a4c-8bdc-2f8cbb275a90" />


<img width="1321" height="603" alt="Screenshot (1245)" src="https://github.com/user-attachments/assets/e695202d-8add-4369-914f-6789897963fa" />


<img width="1322" height="608" alt="Screenshot (1246)" src="https://github.com/user-attachments/assets/6892791a-9fde-4cc9-960a-97f640252b08" />


## 🧠 ML / NLP Features
Nirbhay uses a custom keyword-weighted NLP sentiment engine to analyse user reviews:
Positive signals: "well lit" (+8), "police" (+6), "cctv" (+7), "safe" (+8), "comfortable" (+6)
Negative signals: "dark" (-8), "harassed" (-10), "isolated" (-8), "snatching" (-10), "unsafe" (-9)

Each review gets a sentiment score (-100 to +100)
Confidence % shown per review card
Aggregate sentiment adjusts route safety scores by up to ±5 points
24-hour risk multipliers based on Delhi crime patterns — 1 AM is 1.5x riskier than 10 AM.

<img width="1319" height="606" alt="Screenshot (1281)" src="https://github.com/user-attachments/assets/1fb15a10-a2fb-4b6d-b35b-79cc7ec1d945" />



<img width="1315" height="610" alt="Screenshot (1279)" src="https://github.com/user-attachments/assets/03db7ec8-d3f1-4bef-a5fc-1e40b9906643" />


<img width="1321" height="610" alt="Screenshot (1280)" src="https://github.com/user-attachments/assets/5ef27dc1-9b12-41c2-bc33-d39354f87efb" />


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

<img width="1181" height="608" alt="Screenshot (1240)" src="https://github.com/user-attachments/assets/aeb89299-c1e7-4d3b-9bbf-43756cddb4c0" />



## 🛠️ Tech Stack
| Layer  |Tool  |Cost  |
|--------|------|------|
|Frontend |React 18 + TypeScript |Free|
|Styling|Tailwind CSS| Free|
|Routing| TanStack Router| Free|
|Maps| Leaflet.js + OpenStreetMap| Free|
|Database| Firebase Firestore| Free tier (50k reads/day)|
|Build |Vite  | Free |
|Hosting | Vercel |Free |
|UI  | ScaffoldLovable (AI builder)|


## 🚀 Future Scope
1. Transition to an ML-Powered SystemWhile the current version uses a manual formula, the next phase involves upgrading to a Machine Learning layer.  Predictive Modeling: Instead of static weights, you can train Random Forest or XGBoost models to predict area safety scores.  Feature Expansion: The model can learn from complex features like crime counts, lighting, proximity to police, and specific area types (e.g., commercial vs. residential).  Dynamic Labeling: Implementing safety labels derived from historical crime severity data to provide more nuanced routing.
  
2. Integration of Real-Time Safety SignalsTo make the app more "impressive" and research-worthy, you can incorporate additional live data points:  Crowd Density: Approximating population or crowd density based on the time of day using OSM area type tags.  Infrastructure Data: Incorporating municipal open data portals to track real-time street light density and maintenance.  Police Proximity: Refining the road graph to prioritize proximity to police stations extracted directly from OpenStreetMap.
     
3. Advanced Routing & User PersonalizationThe core algorithm can be further tuned to offer a more tailored experience:Balanced Mode: Refining the "Balanced Route" which intelligently combines safety scores with distance to ensure users aren't taking unnecessarily long detours.  Automated Weight Tuning: Moving beyond manual weight settings ($w1, w2, etc.$) to a system where weights are learned or tuned based on user feedback—a great point to mention in professional evaluations or vivas.
  
4. Expansion of Geospatial IntelligenceScale: Expanding the road network graph beyond a single city (like delhi or noida) to a national level using the OSMnx library.  Granular Mapping: Using GeoPandas to perform even more precise geospatial joins, mapping specific crime incidents to the exact nearest road segments for pinpoint accuracy.  
