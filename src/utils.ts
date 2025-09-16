import { KidsSong, TabNote, Duration } from './types'

/**
 * Convert our simple KidsSong JSON into alphaTex.
 * We keep it *monophonic* and simple (perfect for kids’ melodies).
 * Notes are written like "fret/string" and we re-state duration when it changes (":q", ":8", etc.).
 */
function songToAlphaTex(song: KidsSong): string {
  const title = safeAlphaTexString(song.title || 'Untitled')
  const tempo = Math.max(40, Math.min(song.tempo ?? 100, 300))
  const time = song.time ?? { num: 4, den: 4 }

  // Header: title + a TAB-only stave. (alphaTab defaults to standard tuning)
  const header: string[] = [
    `title "${title}"`,
    `tabstave notation=false time=${time.num}/${time.den} tempo=${tempo}`,
  ]

  // Body: render measures; re-emit duration marker when it changes.
  const body: string[] = []
  for (let m = 0; m < song.measures.length; m++) {
    const measure = song.measures[m]
    if (!measure?.notes?.length) {
      body.push('|') // empty bar
      continue
    }

    let currentDur: Duration | null = null
    const parts: string[] = []

    for (const n of measure.notes) {
      if (!isValidNote(n)) continue
      if (n.dur !== currentDur) {
        parts.push(`:${n.dur}`)
        currentDur = n.dur as Duration
      }
      // alphaTex strings are numbered 1..6 (1=highest string)
      // Write as fret/string, e.g. 0/1 2/2 etc.
      parts.push(`${n.fret}/${n.string}`)
    }

    body.push(parts.join(' ') + ' |')
  }

  return [...header, 'notes', body.join(' ')].join('\n')
}

function safeAlphaTexString(s: string): string {
  // very light escaping for quotes/newlines
  return s.replace(/"/g, '\\"').replace(/\n/g, ' ')
}

function isValidNote(n: TabNote): boolean {
  if (typeof n?.fret !== 'number' || typeof n?.string !== 'number') return false
  if (n.string < 1 || n.string > 6) return false
  return true
}
