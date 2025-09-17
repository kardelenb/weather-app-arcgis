import React, { useState } from 'react'
import MapView from './components/MapView'
import CoordsBox from './components/CoordsBox'
import WeatherPanel from './components/WeatherPanel'

export default function App() {
  const [coords, setCoords] = useState({ lat: null, lon: null })
  const [place, setPlace] = useState('')

  const handleMapClick = (payload) => {
    const { lat, lon, place: p } = payload || {}
    if (lat != null && lon != null) setCoords({ lat, lon })
    if (p) setPlace(p)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Wetter-App</h1>
        <div className="subtitle">Karte, Koordinaten, Ort & Vorhersage</div>
      </header>

      <div className="content">
        <div className="map">
          <MapView onMapClick={handleMapClick} />
          <CoordsBox lat={coords.lat} lon={coords.lon} />
          <WeatherPanel lat={coords.lat} lon={coords.lon} place={place} />
        </div>
      </div>
    </div>
  )
}