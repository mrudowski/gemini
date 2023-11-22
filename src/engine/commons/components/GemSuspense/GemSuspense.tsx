import React, {FC, Suspense, useEffect} from 'react';
import styles from './styles/GemSuspense.module.scss';
import {turnOffGemLoading, turnOnGemLoading} from '../../../redux/tempSlice';
import {useTypedDispatch} from '../../../redux/store';

interface ISuspenseFallBack {
  onReady?: (ready: boolean) => void;
  kind: 'main' | 'ui';
}

/**
 * empty div - we pass loading state to redux at support it in GemLock/Loader
 */
const SuspenseFallBack: FC<ISuspenseFallBack> = ({onReady, kind}) => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    // console.log('%c [mr] SuspenseFallback', 'background-color:Gold; color: black', 'enter -> false');
    dispatch(turnOnGemLoading(kind));
    onReady?.(false);
    return () => {
      // console.log('%c [mr] SuspenseFallback', 'background-color:Gold; color: black', 'exit -> true');
      dispatch(turnOffGemLoading());
      onReady?.(true);
    };
  }, [onReady, dispatch, kind]);

  return <div className={styles.gemSuspenseFallback} />;
};

interface IGemSuspense {
  onReady?: (ready: boolean) => void;
  kind: 'main' | 'ui';
}

const GemSuspense: FC<IGemSuspense> = ({onReady, kind, ...restProps}) => {
  return <Suspense fallback={<SuspenseFallBack onReady={onReady} kind={kind} />} {...restProps} />;
};

export default GemSuspense;
