const ACTORS = {
  myo: 'myo',
  salammon: 'salammon',
  gofung: 'gofung',
};

// TODO as const


// const ACTORS_NAMES = {
//   salammon: 'salammon',
// };

export type IActorId = keyof typeof ACTORS;
export type IActors = {[key in IActorId]: key};

export default ACTORS as IActors;
