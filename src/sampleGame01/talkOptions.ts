import T from '../engine/translation';
const t = T();

// TODO move methods to utils (away from user game definition)
// TODO - even better - move TALK_OPTIONS to engine

const TALK_OPTIONS = Object.keys(t.talkOptions).reduce((talkOptionsAsState, talkOptionId) => {
  talkOptionsAsState[talkOptionId] = talkOptionId;
  return talkOptionsAsState;
}, {} as {[key in keyof typeof t.talkOptions]: key});

export default TALK_OPTIONS;
