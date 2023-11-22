import ACTORS from '../../game/actors/actors';
import TALK_OPTIONS from '../../game/actors/talkOptions';

export type IActorId = keyof typeof ACTORS;

export type ITalkOptions = typeof TALK_OPTIONS;
export type ITalkOptionsActors = keyof ITalkOptions;

/**
 * https://stackoverflow.com/questions/51435783/pick-and-flatten-a-type-signature-in-typescript
 * https://flut1.medium.com/deep-flatten-typescript-types-with-finite-recursion-cb79233d93ca
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type PickAndFlatten<T, K extends keyof T> = UnionToIntersection<T[K]>;

export type ITalkOptionId = keyof PickAndFlatten<ITalkOptions, ITalkOptionsActors>;
