import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as alphaTab from '@coderline/alphatab'
import { KidsSong } from './types'
import { songToAlphaTex } from './utils'

type Props = {
  song: KidsSong
  // optional UI bits
  className?: string
  showControls?: boolean
}

export default function KidsTabAlpha({
  song,
  className,
  showControls = true,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const apiRef = useRef<alphaTab.AlphaTabApi | null>(null)

  // Build alphaTex whenever the JSON changes
  const alphaTex = useMemo(() => songToAlphaTex(song), [song])

  // Local UI state for playback speed (1.0 = normal)
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    if (!hostRef.current) return

    // Create or re-create the alphaTab instance whenever alphaTex changes
    const container = hostRef.current

    // Destroy old instance if present
    if (apiRef.current) {
      try {
        apiRef.current.destroy()
      } catch {}
      apiRef.current = null
    }

    // Convert text to Uint8Array for alphaTab "file" input
    const file = new TextEncoder().encode(alphaTex)

    const api = new alphaTab.AlphaTabApi(container, {
      file: { data: file, type: 'text' },
      player: { enablePlayer: true }, // enable playback
      notation: { staveProfile: 'tab' }, // show TAB only
      display: { scale: 1.0 }, // adjust if you want bigger/smaller
    })

    // Optional: tie the cursor to playback
    api.scoreRenderer.cursor.playbackSpeed = speed

    // Store instance
    apiRef.current = api

    // Cleanup
    return () => {
      try {
        api.destroy()
      } catch {}
      apiRef.current = null
    }
  }, [alphaTex]) // re-run when song changes

  // Keep alphaTab playback speed in sync with UI slider
  useEffect(() => {
    const api = apiRef.current
    if (!api) return
    try {
      // If available in your alphaTab version:
      // api.changePlaybackSpeed?.(speed);
      // Fallback: set directly on cursor (works in recent builds):
      api.scoreRenderer.cursor.playbackSpeed = speed
    } catch {
      // ignore if not supported
    }
  }, [speed])

  return (
    <div className={className}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 12,
          marginBottom: 8,
        }}
      >
        <h3 style={{ margin: 0 }}>{song.title || 'Untitled'}</h3>
        <small>
          {song.time ? `${song.time.num}/${song.time.den}` : '4/4'} •{' '}
          {song.tempo ?? 100} BPM
        </small>
      </div>

      {/* alphaTab host */}
      <div ref={hostRef} />

      {showControls && (
        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <button onClick={() => apiRef.current?.play()}>Play</button>
          <button onClick={() => apiRef.current?.pause()}>Pause</button>
          <button onClick={() => apiRef.current?.stop()}>Stop</button>

          <label style={{ marginLeft: 16 }}>
            Speed: <strong>{speed.toFixed(2)}x</strong>
          </label>
          <input
            type="range"
            min={0.5}
            max={1.5}
            step={0.05}
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            style={{ width: 160 }}
          />
        </div>
      )}
    </div>
  )
}
