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
