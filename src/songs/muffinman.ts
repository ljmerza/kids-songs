/*
Reference tab sources for this song (direct search links):
- Ultimate Guitar: https://www.ultimate-guitar.com/search.php?search_type=title&value=The%20Muffin%20Man
- Songsterr: https://www.songsterr.com/?pattern=The%20Muffin%20Man
- MuseScore: https://musescore.com/sheetmusic?text=The%20Muffin%20Man%20guitar
- Chordify: https://chordify.net/search/The%20Muffin%20Man
- Google: https://www.google.com/search?q=The%20Muffin%20Man%20guitar%20tabs
*/
import type { KidsSong } from "../types";

export const muffinman: KidsSong = {
  title: "The Muffin Man",
  category: "Traditional Nursery Rhymes",
  tags: ["beginner", "traditional", "nursery-rhyme", "sing-along"],
  tempo: 120,
  time: { num: 4, den: 4 },
  measures: [
    {
      notes: [
        { fret: 0, string: 3, dur: "q" },
        { fret: 0, string: 3, dur: "q" },
        { fret: 0, string: 3, dur: "q" },
        { fret: 2, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 3, string: 3, dur: "q" },
        { fret: 3, string: 3, dur: "q" },
        { fret: 2, string: 3, dur: "h" },
      ],
    },
    {
      notes: [
        { fret: 2, string: 3, dur: "q" },
        { fret: 2, string: 3, dur: "q" },
        { fret: 0, string: 3, dur: "q" },
        { fret: 0, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 3, string: 4, dur: "q" },
        { fret: 3, string: 4, dur: "q" },
        { fret: 0, string: 3, dur: "h" },
      ],
    },
  ],
};
