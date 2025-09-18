import { render, screen } from '@testing-library/react'
import CoordsBox from '../CoordsBox'

describe('CoordsBox', () => {
  test('zeigt Hinweis ohne Koordinaten', () => {
    render(<CoordsBox lat={null} lon={null} />)
    expect(screen.getByText(/klicken sie in die karte/i)).toBeInTheDocument()
  })

  test('zeigt Lat und Lon beschriftet', () => {
    render(<CoordsBox lat={56.170086} lon={31.005859} />)
    expect(screen.getByText(/lat:\s*56\.170086/i)).toBeInTheDocument()
    expect(screen.getByText(/lon:\s*31\.005859/i)).toBeInTheDocument()
  })

  test('zeigt lon = 0 korrekt (kein falsy-Problem)', () => {
    render(<CoordsBox lat={10.5} lon={0} />)
    expect(screen.getByText(/lat:\s*10\.500000/i)).toBeInTheDocument()
    expect(screen.getByText(/lon:\s*0\.000000/i)).toBeInTheDocument()
  })
})
