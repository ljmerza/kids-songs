import { KidsSong } from '../types';

const mary: KidsSong = {
  title: 'Mary Had a Little Lamb',
  tempo: 100,
  time: { num: 4, den: 4 },
  measures: [
    {
      notes: [
        { fret: 0, string: 1, dur: 'q' },
        { fret: 2, string: 1, dur: 'q' },
        { fret: 4, string: 1, dur: 'q' },
        { fret: 2, string: 1, dur: 'q' },
      ],
    },
    {
      notes: [
        { fret: 0, string: 1, dur: 'q' },
        { fret: 0, string: 1, dur: 'q' },
        { fret: 0, string: 1, dur: 'h' },
      ],
    },
    // add more measures as needed...
  ],
}
