import {useEffect, useRef} from 'react';

let timeoutId;

const usePlayNextCoolDown = ({deps, delayInMs}: {deps: any; delayInMs: number}) => {
  const playNextReadyRef = useRef(false);

  useEffect(() => {
    playNextReadyRef.current = false;
    clearTimeout(timeoutId);

    if (deps) {
      timeoutId = setTimeout(() => {
        playNextReadyRef.current = true;
      }, delayInMs);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [deps, delayInMs]);

  return {
    playNextReadyRef,
  };
};

export default usePlayNextCoolDown;
