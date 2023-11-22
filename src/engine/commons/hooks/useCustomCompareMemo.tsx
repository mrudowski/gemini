import {useRef} from 'react';

/**
 * based on
 * https://github.com/Sanjagh/use-custom-compare-effect/blob/master/src/index.js
 *
 * function useCustomCompareEffect<T>(create: () => MaybeCleanUpFn, input: T, equal: (T, T) => boolean) {
 *   useEffect(create, [useCustomCompareMemo(input, equal)]);
 * }
 */

function useCustomCompareMemo<T>(value: T, equal: (value1: T, value2: T) => boolean): T {
  const ref = useRef<T>(value);

  if (!equal(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export default useCustomCompareMemo;
