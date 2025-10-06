import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import WeatherPanel from '../WeatherPanel'

vi.mock('../../lib/http', () => ({
  fetchForecastByCoords: vi.fn()
}))
import { fetchForecastByCoords } from '../../lib/http'

describe('WeatherPanel', () => {
  test('rendert null ohne Koordinaten', () => {
    const { container } = render(<WeatherPanel lat={null} lon={null} place="" />)
    expect(container.firstChild).toBeNull()
  })

  test('zeigt Ladezustand und danach Daten', async () => {
    fetchForecastByCoords.mockResolvedValueOnce({
      city: { name: 'Berlin' },
      list: [
        { dt_txt: '2025-09-18 12:00:00', main: { temp: 18 }, weather: [{ description: 'klar' }] },
        { dt_txt: '2025-09-18 15:00:00', main: { temp: 19 }, weather: [{ description: 'leicht bewölkt' }] }
      ]
    })

    render(<WeatherPanel lat={52.5} lon={13.4} place="Berlin, Deutschland" />)

    // Ladezustand sichtbar
    expect(screen.getByText(/lade vorhersage/i)).toBeInTheDocument()

    // Danach Inhalte
    await waitFor(() => {
      // Header nutzt bevorzugt "place"
      expect(screen.getByText(/Berlin, Deutschland/i)).toBeInTheDocument()
      // Temperatur-Badge vorhanden (mind. eine Zeile)
      expect(screen.getAllByText(/°C$/).length).toBeGreaterThan(0)
    })
  })

  test('zeigt Fehlertext bei Fehler', async () => {
    fetchForecastByCoords.mockRejectedValueOnce(new Error('Boom'))
    render(<WeatherPanel lat={52.5} lon={13.4} place="" />)
      expect(await screen.findByText(/fehler beim laden/i)).toBeInTheDocument()
  })
})
