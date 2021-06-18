const ACTORS = {
  myo: 'myo',
  salammon: 'salammon',
  gofung: 'gofung',
} as const;

export type IActorId = keyof typeof ACTORS;

export default ACTORS;
