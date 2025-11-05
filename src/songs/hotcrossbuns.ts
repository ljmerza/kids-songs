import type { KidsSong } from "../types";

export const hotcrossbuns: KidsSong = {
  title: "Hot Cross Buns",
  category: "Traditional Nursery Rhymes",
  tags: ["beginner", "traditional", "simple", "three-note"],
  tempo: 100,
  time: { num: 4, den: 4 },
  measures: [
    {
      notes: [
        { fret: 2, string: 3, dur: "q" },
        { fret: 0, string: 3, dur: "q" },
        { fret: 3, string: 4, dur: "h" },
      ],
    },
    {
      notes: [
        { fret: 2, string: 3, dur: "q" },
        { fret: 0, string: 3, dur: "q" },
        { fret: 3, string: 4, dur: "h" },
      ],
    },
    {
      notes: [
        { fret: 3, string: 4, dur: "8" },
        { fret: 3, string: 4, dur: "8" },
        { fret: 3, string: 4, dur: "8" },
        { fret: 3, string: 4, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
      ],
    },
    {
      notes: [
        { fret: 2, string: 3, dur: "q" },
        { fret: 0, string: 3, dur: "q" },
        { fret: 3, string: 4, dur: "h" },
      ],
    },
  ],
};
