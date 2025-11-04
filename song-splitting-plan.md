# Song Data Splitting Plan

## Overview
Currently all song data (metadata + full tab measures) is bundled into a single import on the HomePage, causing unnecessary initial load. This plan outlines splitting song objects into two parts:
1. **Metadata** - lightweight data for the home page listing
2. **Full Song Data** - complete data including tab measures, loaded only when viewing a song

---

## Current Structure Problems

### Current Setup
- **File**: `src/songs/index.ts` imports ALL songs upfront
- **HomePage.tsx** loads entire songs array (21 songs × ~100 measures each)
- **Issue**: HomePage only needs `title`, `category`, `tags`, `tempo`, `time` but loads full `measures` arrays
- **Impact**: Larger initial bundle size, slower time-to-interactive

### Current Data Flow
```
songs/index.ts (imports all 21 songs with full measures)
    ↓
HomePage.tsx (uses: title, category, tags, tempo, time)
    ↓
SongPage.tsx (uses: everything including measures)
```

---

## Proposed Solution

### Split Song Data Into Two Types

#### 1. SongMetadata (for HomePage)
```typescript
export type SongMetadata = {
  id: string
  title: string
  category: string
  tags: Array<string>
  tempo?: number
  time?: { num: number; den: number }
}
```

#### 2. KidsSong (for SongPage - existing type)
```typescript
// Keep existing KidsSong type in types.ts
export type KidsSong = {
  title: string
  category: string
  tags: Array<string>
  tuning?: Array<string>
  tempo?: number
  time?: { num: number; den: number }
  measures: Array<TabMeasure>  // Heavy data!
}
```

---

## New File Structure

### Option A: Metadata Index + Lazy Loading (RECOMMENDED)

```
src/songs/
├── metadata.ts          # Export array of SongMetadata only
├── twinkle.ts          # Keep existing full song exports
├── mary.ts
├── abc.ts
└── ...
```

**metadata.ts** (new file):
```typescript
import type { SongMetadata } from '../types'

export const songMetadata: Array<SongMetadata> = [
  {
    id: 'mary',
    title: 'Mary Had a Little Lamb',
    category: 'Classic Nursery Rhymes',
    tags: ['beginner', 'nursery-rhyme', 'traditional'],
    tempo: 120,
    time: { num: 4, den: 4 }
  },
  {
    id: 'twinkle',
    title: 'Twinkle Twinkle Little Star',
    category: 'Classic Nursery Rhymes',
    tags: ['beginner', 'lullaby', 'sing-along', 'traditional', 'bedtime'],
    tempo: 100,
    time: { num: 4, den: 4 }
  },
  // ... all 21 songs
]
```

**HomePage.tsx** changes:
```typescript
import { songMetadata } from '../songs/metadata'

export function HomePage() {
  return (
    // ... map over songMetadata instead of songs
    {songMetadata.map((song) => (
      <Col key={song.id}>
        <Card>
          <Card.Title>{song.title}</Card.Title>
          <span className="badge bg-primary">{song.category}</span>
          {song.tags.slice(0, 3).map((tag) => ...)}
          <Card.Text>
            Tempo: {song.tempo || 100} BPM
            Time: {song.time?.num || 4}/{song.time?.den || 4}
          </Card.Text>
          <Link to={`/song/${song.id}`}>Play Song</Link>
        </Card>
      </Col>
    ))}
  )
}
```

**SongPage.tsx** changes (lazy loading):
```typescript
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { KidsSong } from '../types'

export function SongPage() {
  const { songId } = useParams<{ songId: string }>()
  const [song, setSong] = useState<KidsSong | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dynamic import - only loads when route is accessed
    import(`../songs/${songId}.ts`)
      .then((module) => {
        setSong(module[songId])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [songId])

  if (loading) return <Container>Loading...</Container>
  if (!song) return <Container>Song not found</Container>

  return (
    <Container>
      <h1>{song.title}</h1>
      <TabRenderer song={song} />
    </Container>
  )
}
```

---

### Option B: Separate Directories (Alternative)

```
src/songs/
├── metadata/
│   └── index.ts        # All metadata exports
├── full/
│   ├── twinkle.ts     # Full song data
│   ├── mary.ts
│   └── ...
```

More organized but requires more file moves.

---

## Implementation Steps

### Phase 1: Setup Types
1. Add `SongMetadata` type to `src/types.ts`
2. Keep existing `KidsSong` type unchanged

### Phase 2: Create Metadata File
1. Create `src/songs/metadata.ts`
2. Extract metadata from each song file
3. Build array of 21 `SongMetadata` objects
4. Ensure `id` matches filename (e.g., 'twinkle' → twinkle.ts)

### Phase 3: Update HomePage
1. Change `HomePage.tsx` import from `songs` to `songMetadata`
2. Update map to use metadata fields
3. Keep routing the same (`/song/${id}`)

### Phase 4: Update SongPage
1. Remove static `songs` import
2. Add state for song data (`useState<KidsSong | null>`)
3. Add `useEffect` with dynamic import based on `songId`
4. Add loading state
5. Handle error state (invalid song ID)

### Phase 5: Cleanup
1. Delete or keep `src/songs/index.ts` (can remove if not needed)
2. Individual song files (twinkle.ts, etc.) stay unchanged

### Phase 6: Testing
1. Test HomePage loads quickly with metadata only
2. Test each song page loads correctly with dynamic import
3. Test invalid song IDs show error
4. Check bundle size before/after (use `npm run build` and check dist/)

---

## Benefits

### Performance
- **Initial bundle size**: ~90% reduction in initial song data
- **HomePage load**: Faster, only loads ~2KB metadata vs ~200KB+ full data
- **Code splitting**: Each song loads on-demand (better caching)
- **Time-to-interactive**: Improved

### Maintainability
- Cleaner separation of concerns
- Easy to add new songs (just add to metadata.ts)
- Individual song files remain independent

### Scalability
- Can easily add 100+ songs without bloating initial bundle
- Vite/webpack will automatically code-split dynamic imports

---

## Potential Issues & Solutions

### Issue 1: TypeScript Dynamic Import
**Problem**: Dynamic imports need proper typing
**Solution**: Use `import()` with type assertion or define module exports

### Issue 2: Build Config
**Problem**: Vite might need config for dynamic imports
**Solution**: Vite supports this by default, but verify with `vite.config.ts`

### Issue 3: Export Naming
**Problem**: Each song file exports as `export const twinkle: KidsSong`
**Solution**: Dynamic import accesses as `module.twinkle`, need to match songId to export name

### Issue 4: Preloading
**Problem**: Might want to preload songs on hover
**Solution**: Can add `<link rel="prefetch">` or preload on hover using `import()` without awaiting

---

## Alternative: Route-Based Code Splitting

Instead of manual dynamic imports, could use React Router's lazy loading:

```typescript
// App.tsx or router config
const SongPage = lazy(() => import('./pages/SongPage'))

// Each song becomes a separate chunk automatically
```

But this doesn't solve the "all songs loaded" problem - still need metadata split.

---

## Estimated Impact

### Current (all songs loaded upfront)
- Initial bundle: ~250KB (21 songs × ~10KB each)
- HomePage TTI: Slower due to parsing

### After Split
- Initial bundle: ~5KB (metadata only)
- Song page load: ~10KB per song (on-demand)
- Overall improvement: ~95% reduction in initial load

---

## Decision: Go with Option A

**Recommended approach**: Metadata index + lazy loading via dynamic imports
- Simplest to implement
- Leverages Vite's built-in code splitting
- No complex routing changes needed
- Easy to roll back if issues arise

---

## Next Steps

1. Review this plan
2. Create `SongMetadata` type
3. Build `metadata.ts` with all 21 songs
4. Update HomePage to use metadata
5. Refactor SongPage with dynamic imports
6. Test and measure improvements
7. Consider adding loading animations for better UX
