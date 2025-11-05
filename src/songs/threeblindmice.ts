/*
Reference tab sources for this song (direct search links):
- Ultimate Guitar: https://www.ultimate-guitar.com/search.php?search_type=title&value=Three%20Blind%20Mice
- Songsterr: https://www.songsterr.com/?pattern=Three%20Blind%20Mice
- MuseScore: https://musescore.com/sheetmusic?text=Three%20Blind%20Mice%20guitar
- Chordify: https://chordify.net/search/Three%20Blind%20Mice
- Google: https://www.google.com/search?q=Three%20Blind%20Mice%20guitar%20tabs
*/
import type { KidsSong } from "../types";

export const threeblindmice: KidsSong = {
  title: "Three Blind Mice",
  category: "Traditional Nursery Rhymes",
  tags: ["beginner", "traditional", "nursery-rhyme", "sing-along"],
  tempo: 120,
  time: { num: 6, den: 8 },
  measures: [
    {
      notes: [
        { fret: 3, string: 4, dur: "q" },
        { fret: 2, string: 4, dur: "q" },
        { fret: 0, string: 4, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 3, string: 4, dur: "q" },
        { fret: 2, string: 4, dur: "q" },
        { fret: 0, string: 4, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 3, string: 3, dur: "8" },
        { fret: 3, string: 3, dur: "8" },
        { fret: 3, string: 3, dur: "8" },
        { fret: 2, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 2, string: 3, dur: "8" },
      ],
    },
    {
      notes: [
        { fret: 3, string: 3, dur: "h" },
      ],
    },
  ],
};
