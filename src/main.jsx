import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ParkingProvider } from './context/ParkingContext'
import { ErrorBoundary } from './components/ui/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ParkingProvider>
        <App />
      </ParkingProvider>
    </ErrorBoundary>
  </StrictMode>,
)
