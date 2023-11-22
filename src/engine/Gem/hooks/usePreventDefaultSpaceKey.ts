import {useCallback, useEffect} from 'react';

const usePreventDefaultSpaceKey = () => {
  const blockSpaceKey = useCallback(e => {
    if (e.code === 'Space') {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', blockSpaceKey, false);
    return () => {
      document.removeEventListener('keydown', blockSpaceKey, false);
    };
  }, [blockSpaceKey]);
};

export default usePreventDefaultSpaceKey;
