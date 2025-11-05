import type { KidsSong } from "../types";

export const rockabye: KidsSong = {
  title: "Rock-a-Bye Baby",
  category: "Traditional Nursery Rhymes",
  tags: ["beginner", "lullaby", "traditional", "bedtime", "soothing"],
  tempo: 80,
  time: { num: 6, den: 8 },
  measures: [
    {
      notes: [
        { fret: 0, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 3, string: 3, dur: "8" },
        { fret: 0, string: 2, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 0, string: 2, dur: "8" },
        { fret: 3, string: 3, dur: "8" },
        { fret: 3, string: 3, dur: "8" },
        { fret: 2, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 0, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 3, string: 3, dur: "8" },
        { fret: 0, string: 2, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 3, string: 3, dur: "h" },
      ],
    },
    {
      notes: [
        { fret: 3, string: 3, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
        { fret: 3, string: 2, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 3, string: 2, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
        { fret: 3, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 0, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 3, string: 3, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
        { fret: 3, string: 3, dur: "8" },
      ],
    },
    {
      notes: [
        { fret: 0, string: 3, dur: "h" },
      ],
    },
  ],
};
