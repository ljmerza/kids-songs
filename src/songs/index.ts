import type { KidsSong } from '../types';

import { mary } from './mary';
import { abc } from './abc';
import { baabaa } from './baabaa';
import { spider } from './spider';
import { twinkle } from './twinkle';
import { rowboat } from './rowboat';
import { wheels } from './wheels';
import { oldmacdonald } from './oldmacdonald';

export const songs: Array<{ id: string; song: KidsSong }> = [
  { id: 'mary', song: mary },
  { id: 'abc', song: abc },
  { id: 'baabaa', song: baabaa },
  { id: 'spider', song: spider },
  { id: 'twinkle', song: twinkle },
  { id: 'rowboat', song: rowboat },
  { id: 'wheels', song: wheels },
  { id: 'oldmacdonald', song: oldmacdonald },
];