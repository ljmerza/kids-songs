import type { KidsSong } from "../types";

export const humpty: KidsSong = {
  title: "Humpty Dumpty",
  category: "Classic Nursery Rhymes",
  tags: ["beginner", "traditional", "sing-along", "story"],
  tempo: 100,
  time: { num: 4, den: 4 },
  measures: [
    {
      notes: [
        { fret: 2, string: 3, dur: "q" },
        { fret: 3, string: 3, dur: "q" },
        { fret: 0, string: 2, dur: "q" },
        { fret: 3, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 2, string: 3, dur: "q" },
        { fret: 3, string: 3, dur: "q" },
        { fret: 0, string: 2, dur: "h" },
      ],
    },
    {
      notes: [
        { fret: 0, string: 2, dur: "q" },
        { fret: 3, string: 3, dur: "q" },
        { fret: 2, string: 3, dur: "q" },
        { fret: 0, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 2, string: 3, dur: "h" },
        { fret: 2, string: 3, dur: "h" },
      ],
    },
    {
      notes: [
        { fret: 2, string: 3, dur: "q" },
        { fret: 3, string: 3, dur: "q" },
        { fret: 0, string: 2, dur: "q" },
        { fret: 3, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 2, string: 3, dur: "q" },
        { fret: 3, string: 3, dur: "q" },
        { fret: 0, string: 2, dur: "h" },
      ],
    },
    {
      notes: [
        { fret: 0, string: 2, dur: "q" },
        { fret: 3, string: 3, dur: "q" },
        { fret: 2, string: 3, dur: "q" },
        { fret: 0, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 2, string: 3, dur: "w" },
      ],
    },
  ],
};
