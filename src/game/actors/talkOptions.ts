import {END} from '../../engine/actions/constants';
import ACTORS from './actors';

export const OPTIONS = 'talkOptions';

const COMMON_TALK_OPTIONS = {
  end: END,
} as const;

const TALK_OPTIONS = {
  [ACTORS.hazel]: {
    ...COMMON_TALK_OPTIONS,
    elmWork: 'elmWork',
    hazelWork: 'hazelWork',
    hazelWork2: 'hazelWork2',
    firstborn: 'firstborn',
    workshop: 'workshop',
  },
  [ACTORS.elm]: {
    ...COMMON_TALK_OPTIONS,
    discoveryOfTheGrandchildren: 'discoveryOfTheGrandchildren',
    elmWork: 'elmWork',
    elmWork2: 'elmWork2',
    hazelWork: 'hazelWork',
    workshop: 'workshop',
  },
} as const;

export default TALK_OPTIONS;
