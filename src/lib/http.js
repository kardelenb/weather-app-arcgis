export async function reverseGeocode(lat, lon) {
    const key = import.meta.env.VITE_OPENCAGE_API_KEY
    const url =
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}` +
        `&key=${key}&no_annotations=1&language=de`
    const res = await fetch(url)
    if (!res.ok) throw new Error('OpenCage request failed')
    const data = await res.json()
    return data?.results?.[0]?.formatted || ''
}

export async function fetchForecastByCoords(lat, lon) {
    const key = import.meta.env.VITE_OPENWEATHER_API_KEY
    const url =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}` +
        `&appid=${key}&units=metric&lang=de`
    const res = await fetch(url)
    if (!res.ok) throw new Error('OpenWeather request failed')
    return res.json()
}