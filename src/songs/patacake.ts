import type { KidsSong } from "../types";

export const patacake: KidsSong = {
  title: "Pat-a-Cake",
  category: "Traditional Nursery Rhymes",
  tags: ["beginner", "action-song", "traditional", "baby", "clapping"],
  tempo: 120,
  time: { num: 2, den: 4 },
  measures: [
    {
      notes: [
        { fret: 0, string: 3, dur: "q" },
        { fret: 0, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 2, string: 3, dur: "q" },
        { fret: 3, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 0, string: 2, dur: "q" },
        { fret: 3, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 2, string: 3, dur: "h" },
      ],
    },
    {
      notes: [
        { fret: 3, string: 3, dur: "q" },
        { fret: 2, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 0, string: 3, dur: "q" },
        { fret: 2, string: 3, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 3, string: 4, dur: "q" },
        { fret: 3, string: 4, dur: "q" },
      ],
    },
    {
      notes: [
        { fret: 0, string: 3, dur: "h" },
      ],
    },
  ],
};
