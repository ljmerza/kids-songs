import './App.css'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const HomePage = lazy(() => import('./pages/HomePage'))
const SongPage = lazy(() => import('./pages/SongPage'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="route-loading">Loading…</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/song/:songId" element={<SongPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App
