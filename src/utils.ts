import type { KidsSong, TabNote, Duration } from "./types";

// Map your durations ("q","h","8",...) to alphaTex numeric values.
const DUR_MAP: Record<Duration, number> = {
  w: 1,  // whole
  h: 2,  // half
  q: 4,  // quarter
  "8": 8,
  "16": 16,
  "32": 32,
};

export function songToAlphaTex(song: KidsSong): string {
  const tempo = clamp(song.tempo ?? 100, 40, 300);
  const time = song.time ?? { num: 4, den: 4 };

  // Score metadata (must end with a single dot line)
  const meta: string[] = [
    `\\tempo ${tempo}`,
  ];

  // Optional tuning if you have it; alphaTab expects high->low like E4 B3 G3 D3 A2 E2
  if (song.tuning?.length) {
    // join with spaces, e.g., E4 B3 G3 D3 A2 E2
    meta.push(`\\tuning ${song.tuning.join(" ")}`);
  }
  meta.push("."); // end of score metadata

  // Start a single track/staff and show only TAB
  const preface = `\\track \\staff{tabs}`;

  // Body: measures using numeric durations and dot separators.
  const bars: string[] = [];
  for (let m = 0; m < song.measures.length; m++) {
    const measure = song.measures[m];
    if (!measure?.notes?.length) {
      bars.push("|");
      continue;
    }
    let currentDur: number | null = null;
    const parts: string[] = [];

    // Put the time signature on the first bar (optional)
    if (m === 0 && time?.num && time?.den) {
      parts.push(`\\ts ${time.num} ${time.den}`);
    }

    for (const n of measure.notes) {
      if (!isValidNote(n)) continue;
      const dur = DUR_MAP[n.dur];
      if (dur && dur !== currentDur) {
        parts.push(`:${dur}`);
        currentDur = dur;
      }
      // alphaTex notes use fret.string (dot), NOT slash
      parts.push(`${n.fret}.${n.string}`);
    }

    bars.push(parts.join(" ") + " |");
  }

  return [...meta, preface, bars.join(" ")].join("\n");
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(n, hi));
}
function isValidNote(n: TabNote): boolean {
  if (typeof n?.fret !== "number" || typeof n?.string !== "number") return false;
  return n.string >= 1 && n.string <= 6;
}
