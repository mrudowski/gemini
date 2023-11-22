import {useEffect} from 'react';
import useCustomCompareMemo from './useCustomCompareMemo';

/**
 * based on
 * https://github.com/Sanjagh/use-custom-compare-effect/blob/master/src/index.js
 *
 * and
 * https://github.com/kentcdodds/use-deep-compare-effect/blob/main/src/index.ts
 */

type MaybeCleanUpFn = void | (() => void);

function useCustomCompareEffect<T>(create: () => MaybeCleanUpFn, input: T, equal: (value1: T, value2: T) => boolean) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(create, [useCustomCompareMemo(input, equal)]);
}

export default useCustomCompareEffect;
