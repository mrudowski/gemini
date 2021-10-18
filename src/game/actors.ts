const ACTORS = {
  elm: 'elm',
  gofung: 'gofung',
  hazel: 'hazel',
  myo: 'myo',
  salammon: 'salammon',
} as const;

export type IActorId = keyof typeof ACTORS;

export default ACTORS;
