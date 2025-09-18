import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest'
import { reverseGeocode, fetchForecastByCoords } from '../http'

const originalEnv = { ...import.meta.env }

beforeEach(() => {
  import.meta.env.VITE_OPENCAGE_API_KEY = 'TEST'
  import.meta.env.VITE_OPENWEATHER_API_KEY = 'TEST'
  global.fetch = vi.fn()
})

afterEach(() => {
  vi.restoreAllMocks()
  Object.assign(import.meta.env, originalEnv)
})

describe('reverseGeocode', () => {
  test('gibt formatted Adresse zurück', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ formatted: 'Berlin, Deutschland' }]
      })
    })
    const name = await reverseGeocode(52.5, 13.4)
    expect(name).toBe('Berlin, Deutschland')
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('api.opencagedata.com')
    )
  })

  test('gibt leeren String bei leerem Result zurück', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ results: [] }) })
    const name = await reverseGeocode(0, 0)
    expect(name).toBe('')
  })

  test('wirft Fehler bei HTTP-Fehler', async () => {
    fetch.mockResolvedValueOnce({ ok: false })
    await expect(reverseGeocode(1, 1)).rejects.toThrow(/OpenCage/)
  })
})

describe('fetchForecastByCoords', () => {
  test('liefert JSON der Vorhersage', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ city: { name: 'Berlin' }, list: [{ dt_txt: '2025-09-18 12:00:00', main: { temp: 18 }, weather: [{ description: 'klar' }] }] })
    })
    const data = await fetchForecastByCoords(52.5, 13.4)
    expect(data.city.name).toBe('Berlin')
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('api.openweathermap.org')
    )
  })

  test('wirft Fehler bei HTTP-Fehler', async () => {
    fetch.mockResolvedValueOnce({ ok: false })
    await expect(fetchForecastByCoords(1, 1)).rejects.toThrow(/OpenWeather/)
  })
})
