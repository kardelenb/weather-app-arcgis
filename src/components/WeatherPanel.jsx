import React, { useEffect, useState } from 'react'
import { fetchForecastByCoords } from '../lib/http'

export default function WeatherPanel({ lat, lon, place }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (lat == null || lon == null) return
    let cancelled = false
    setLoading(true)
    fetchForecastByCoords(lat, lon)
      .then((f) => { if (!cancelled) { setData(f); setError('') } })
      .catch((e) => { if (!cancelled) setError(e?.message || 'Fehler beim Laden') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [lat, lon])

  if (lat == null || lon == null) return null

  return (
    <div className="weatherPanel">
      <h3>{place || data?.city?.name || 'Ort' } – Vorhersage</h3>
      {loading && <div>Lade Vorhersage…</div>}
      {error && <div>{error}</div>}
      {!loading && !error && data && (
        <>
          {data.list
            .filter((_, i) => i % 2 === 0)
            .slice(0, 10)
            .map((e) => (
              <div className="weatherRow" key={e.dt_txt}>
                <div>
                  <div>
                    {new Date(e.dt_txt).toLocaleString('de-DE', {
                      weekday: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div style={{ opacity: .8 }}>{e.weather?.[0]?.description || ''}</div>
                </div>
                <div><span className="badge">{Math.round(e.main?.temp)}°C</span></div>
              </div>
            ))}
        </>
      )}
    </div>
  )
}
