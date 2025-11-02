import './App.css'
import { useState } from 'react'

import TabRenderer from './TabRenderer'
import { songs } from './songs';

function App() {
  const [selectedSongId, setSelectedSongId] = useState<string>('mary');
  const selectedSong = songs.find(s => s.id === selectedSongId)?.song || songs[0].song;

  return (
    <div>
      <div style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
        <h1>Kids Songs</h1>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {songs.map(({ id, song }) => (
            <button
              key={id}
              onClick={() => setSelectedSongId(id)}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedSongId === id ? '#4CAF50' : '#f0f0f0',
                color: selectedSongId === id ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              {song.title}
            </button>
          ))}
        </div>
      </div>
      <TabRenderer song={selectedSong} />
    </div>
  );
}

export default App
