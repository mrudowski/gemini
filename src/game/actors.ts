const ACTORS = {
  myo: 'myo',
  salammon: 'salammon',
  gofung: 'gofung',
  hazel: 'hazel',
} as const;

export type IActorId = keyof typeof ACTORS;

export default ACTORS;
