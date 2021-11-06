import T from '../engine/translation';

const t = T();

// TODO move methods to utils (away from user game definition)
// TODO - even better - move TALK_OPTIONS to engine

export type ITalkOptionId = keyof typeof t.talkOptions;
export type ITalkOptions = {[key in ITalkOptionId]: key};

const TALK_OPTIONS = Object.keys(t.talkOptions).reduce((talkOptionsAsState, talkOptionId) => {
  talkOptionsAsState[talkOptionId] = talkOptionId;
  return {
    ...talkOptionsAsState,
    talkOptions: 'talkOptions',
  };
}, {} as ITalkOptions);

export default TALK_OPTIONS;

export const OPTIONS = 'talkOptions';
