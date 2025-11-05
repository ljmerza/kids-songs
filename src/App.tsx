import './App.css'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FancyLoader from './components/FancyLoader'

const HomePage = lazy(() => import('./pages/HomePage'))
const SongPage = lazy(() => import('./pages/SongPage'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<FancyLoader label="Loading songs..." />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/song/:songId" element={<SongPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App
