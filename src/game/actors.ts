const ACTORS = {
  myo: 'myo',
  salammon: 'salammon',
  gofung: 'gofung',
} as const;

// TODO as const

export const ACTORS_NAMES_CONDITIONS = {
  salammon: {
    'salammonUnpleasant': 'actors.salammon.end',
    'salammon': 'actors.salammon.salammon',
  },
} as const;

export type IActorId = keyof typeof ACTORS;

export default ACTORS;
