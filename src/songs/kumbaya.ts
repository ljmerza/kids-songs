import type { KidsSong } from "../types";

export const kumbaya: KidsSong = {
  title: "Kumbaya",
  category: "Folk Songs",
  tags: ["beginner", "folk", "spiritual", "sing-along", "traditional"],
  tempo: 80,
  time: { num: 4, den: 4 },
  measures: [
    {
      notes: [
        { fret: 0, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 2, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
        { fret: 1, string: 2, dur: "8" },
        { fret: 3, string: 2, dur: "8" },
        { fret: 1, string: 2, dur: "8" },
      ],
    },
    {
      notes: [
        { fret: 0, string: 2, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
        { fret: 1, string: 2, dur: "8" },
        { fret: 3, string: 2, dur: "8" },
        { fret: 1, string: 2, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
        { fret: 2, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
      ],
    },
    {
      notes: [
        { fret: 2, string: 3, dur: "8" },
        { fret: 2, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 3, string: 4, dur: "8" },
        { fret: 2, string: 4, dur: "8" },
        { fret: 0, string: 4, dur: "8" },
        { fret: 2, string: 3, dur: "8" },
      ],
    },
    {
      notes: [
        { fret: 0, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 2, string: 3, dur: "8" },
        { fret: 0, string: 3, dur: "8" },
        { fret: 0, string: 2, dur: "8" },
        { fret: 1, string: 2, dur: "8" },
        { fret: 3, string: 2, dur: "8" },
        { fret: 1, string: 2, dur: "q" },
      ],
    },
  ],
};
