export type Duration = 'w' | 'h' | 'q' | '8' | '16' | '32'

export type TabNote = {
  // 1 = high E string, 6 = low E string (standard TAB convention)
  string: number // 1..6
  fret: number // 0..(whatever)
  dur: Duration // note duration (whole, half, quarter, etc.)
}

export type TabMeasure = {
  notes: Array<TabNote>
}

export type KidsSong = {
  title: string
  category: string
  tags: Array<string>
  // optional; alphaTab defaults to standard tuning if omitted.
  // You can pass things like ["E4","B3","G3","D3","A2","E2"], but we won't need it for basic usage.
  tuning?: Array<string>
  tempo?: number // e.g. 100
  time?: { num: number; den: number } // e.g. { num: 4, den: 4 }
  measures: Array<TabMeasure>
}
