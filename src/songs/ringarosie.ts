import type { KidsSong } from "../types";

export const ringarosie: KidsSong = {
  title: "Ring Around the Rosie",
  category: "Classic Nursery Rhymes",
  tags: ["beginner", "game", "circle-dance", "traditional", "action"],
  tempo: 130,
  time: { num: 6, den: 8 },
  measures: [
    {
      notes: [
        { fret: 0, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 3, string: 3, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
      ],
    },
    {
      notes: [
        { fret: 3, string: 3, dur: "8" },
        { fret: 3, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 3, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 0, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 3, string: 3, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
      ],
    },
    {
      notes: [
        { fret: 3, string: 3, dur: "q" },
        { fret: 0, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 0, string: 2, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
        { fret: 2, string: 2, dur: "8" },
        { fret: 3, string: 2, dur: "8" },
        { fret: 2, string: 2, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
      ],
    },
    {
      notes: [
        { fret: 3, string: 3, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
        { fret: 3, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "q" },
      ],
    },
  ],
};
