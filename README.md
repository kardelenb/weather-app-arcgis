# Wetter-App (ArcGIS + OpenCage + OpenWeather)

Einfache Web-GIS-Anwendung mit dem **ArcGIS Maps SDK for JavaScript**, umgesetzt in **React (Vite)**.  

## Systemvoraussetzungen

- **Node.js 22.x** (getestet mit `v22.19.0`)  
- **npm 10+**  
- **Chrome (aktuell)**  
- Internetzugang (für ArcGIS / OpenCage / OpenWeather APIs)  

## Projekt aufsetzen

```bash
# 1) Repository klonen
git clone git@github.com:kardelenb/weather-app-arcgis.git
cd weather-app-arcgis

# 2) .env.local mit API-Keys anlegen
cat > .env.local << 'EOF'
VITE_ARCGIS_API_KEY=HIER_ARCGIS_KEY_EINSETZEN
VITE_OPENCAGE_API_KEY=HIER_OPENCAGE_KEY_EINSETZEN
VITE_OPENWEATHER_API_KEY=HIER_OPENWEATHER_KEY_EINSETZEN
EOF

# 3) Abhängigkeiten installieren
npm install

## Entwicklung starten (Hot-Reload)
```bash
npm run dev
# Browser öffnet: http://localhost:5173

##Produktion (Teil 3 Build)
# Build erzeugen
npm run build
# Ausgabe liegt in ./dist

# Production-Preview lokal starten
npm run preview
# Browser: http://localhost:4173
