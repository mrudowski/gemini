import {MutableRefObject, useEffect, useRef} from 'react';

/**
 * Will be probably deprecated as not so always fresh solution
 *
 * try `useAutoUpdatedRef` as better solution without useEffect
 * `useEffect` is called after render so...
 * when we use `useAsAlwaysFreshRef` in events/callbacks it will be "fresh" there
 * BUT in situation like here it will fail:
 * ```
 * const busyRef = useAsAlwaysFreshRef(busy);
 * console.log('%c [mr] busyRef', 'background-color:Gold; color: black', busyRef.current === busy); // FALSE
 * ````
 */

type IUseAsAlwaysFreshRef = <T>(initialValue: T) => MutableRefObject<T>;

const useAsAlwaysFreshRef: IUseAsAlwaysFreshRef = value => {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
};

export default useAsAlwaysFreshRef;
