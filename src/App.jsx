import React, { useState } from 'react'
import MapView from './components/MapView'
import CoordsBox from './components/CoordsBox'

export default function App() {
  const [coords, setCoords] = useState({ lat: null, lon: null })

  return (
    <div className="app">
      <header className="header">
        <h1>Wetter-App • Teil 1</h1>
        <div className="subtitle">ArcGIS Basemap + World Cities + Klick-Koordinaten</div>
      </header>
      <div className="content">
        <MapView onMapClick={setCoords} />
        <CoordsBox lat={coords.lat} lon={coords.lon} />
      </div>
    </div>
  )
}
