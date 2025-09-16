import React from 'react'

export default function CoordsBox({ lat, lon }) {
  const fmt = (v) => (v == null ? '' : v.toFixed(6))
  const hasCoords = lat != null && lon != null   // <-- wichtig: null-Check, nicht truthy!

  return (
    <div className="coordsBox">
      <div className="label">Koordinaten (WGS84)</div>
      <div className="value">
        {hasCoords ? `Lat: ${fmt(lat)}, Lon: ${fmt(lon)}` : 'Klicken Sie in die Karte'}
      </div>
    </div>
  )
}