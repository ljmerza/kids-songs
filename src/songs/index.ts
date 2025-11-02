import type { KidsSong } from '../types';

import { mary } from './mary';
import { abc } from './abc';
import { baabaa } from './baabaa';
import { spider } from './spider';
import { twinkle } from './twinkle';
import { rowboat } from './rowboat';
import { wheels } from './wheels';
import { oldmacdonald } from './oldmacdonald';
import { headshoulders } from './headshoulders';
import { happy } from './happy';
import { londonbridge } from './londonbridge';
import { hickory } from './hickory';
import { bingo } from './bingo';
import { monkeys } from './monkeys';
import { humpty } from './humpty';
import { jackandjill } from './jackandjill';
import { thisoldman } from './thisoldman';
import { sunshine } from './sunshine';
import { littlemissmuffet } from './littlemissmuffet';
import { ringarosie } from './ringarosie';
import { popweasel } from './popweasel';

export const songs: Array<{ id: string; song: KidsSong }> = [
  { id: 'mary', song: mary },
  { id: 'abc', song: abc },
  { id: 'baabaa', song: baabaa },
  { id: 'spider', song: spider },
  { id: 'twinkle', song: twinkle },
  { id: 'rowboat', song: rowboat },
  { id: 'wheels', song: wheels },
  { id: 'oldmacdonald', song: oldmacdonald },
  { id: 'headshoulders', song: headshoulders },
  { id: 'happy', song: happy },
  { id: 'londonbridge', song: londonbridge },
  { id: 'hickory', song: hickory },
  { id: 'bingo', song: bingo },
  { id: 'monkeys', song: monkeys },
  { id: 'humpty', song: humpty },
  { id: 'jackandjill', song: jackandjill },
  { id: 'thisoldman', song: thisoldman },
  { id: 'sunshine', song: sunshine },
  { id: 'littlemissmuffet', song: littlemissmuffet },
  { id: 'ringarosie', song: ringarosie },
  { id: 'popweasel', song: popweasel },
];