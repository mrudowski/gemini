import {MutableRefObject, useRef} from 'react';

/**
 * Like useAsAlwaysFreshRef but without useEffect
 * So it should be instant and truly "always fresh" (useEffect is called after render)
 */

type IUseAutoUpdatedRef = <T>(initialValue: T) => MutableRefObject<T>;

const useAutoUpdatedRef: IUseAutoUpdatedRef = value => {
  const valueRef = useRef(value);
  valueRef.current = value;
  return valueRef;
};

export default useAutoUpdatedRef;
