import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as alphaTab from '@coderline/alphatab'
import type { KidsSong } from './types'
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
        </div>
      )}
    </div>
  )
}
