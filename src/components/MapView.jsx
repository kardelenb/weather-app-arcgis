import React, { useEffect, useRef } from 'react'
import esriConfig from '@arcgis/core/config.js'
import Map from '@arcgis/core/Map.js'
import EsriMapView from '@arcgis/core/views/MapView.js' // WICHTIG: umbenannt!
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js'
import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils.js'

export default function MapView({ onMapClick }) {
  const mapDiv = useRef(null)

  useEffect(() => {
    if (!mapDiv.current) return

    const apiKey = import.meta.env.VITE_ARCGIS_API_KEY
    const hasKey = !!apiKey
    if (hasKey) esriConfig.apiKey = apiKey
    else console.warn('Kein ArcGIS API Key gesetzt – nutze temporär OSM-Basemap.')

    const map = new Map({ basemap: hasKey ? 'dark-gray-vector' : 'osm' })

    const view = new EsriMapView({
      container: mapDiv.current,
      map,
      center: [10, 51],
      zoom: 4
    })

    const worldCities = new FeatureLayer({
      url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Cities/FeatureServer/0',
      renderer: {
        type: 'simple',
        symbol: { type: 'simple-marker', color: '#7cc4ff', outline: { color: '#fff', width: 0.5 } },
        visualVariables: [
          { type: 'size', field: 'POP', minDataValue: 100000, maxDataValue: 14000000, minSize: 4, maxSize: 24 }
        ]
      }
    })

    map.add(worldCities)

    const clickHandler = view.on('click', (evt) => {
      try {
        const geo = webMercatorUtils.webMercatorToGeographic(evt.mapPoint)
        onMapClick?.({ lat: geo.y, lon: geo.x })
      } catch (e) {
        console.error('Click handler error', e)
      }
    })

    return () => { clickHandler.remove(); view.destroy() }
  }, [onMapClick])

  return <div className="map" ref={mapDiv} />
}
