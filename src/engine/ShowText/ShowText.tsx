import React, {useCallback, useEffect, useState} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {endAction} from '../scriptPlayer/scriptPlayerSlice';
import ShowTextWidget from './ShowTextWidget';
import useAutoPlayAfter from '../commons/hooks/useAutoPlayAfter';
import {getShowTextAction} from '../actions/showText/showTextActionSlice';
import usePlayNextCoolDown from '../commons/hooks/usePlayNextCoolDown';

interface IShowText {}

const ShowText: React.FC<IShowText> = () => {
  const action = useTypedSelector(getShowTextAction);
  const dispatch = useTypedDispatch();
  const [isShow, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setShow(!!action);
  }, [action]);

  const {playNextReadyRef} = usePlayNextCoolDown({deps: action, delayInMs: 1500});

  const onExitComplete = useCallback(() => {
    dispatch(endAction());
  }, [dispatch]);

  const playNext = useCallback(() => {
    if (playNextReadyRef.current) {
      setShow(false);
    }
  }, [playNextReadyRef]);

  useAutoPlayAfter({
    action,
    playNext,
    ready,
  });

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isShow && action && <ShowTextWidget action={action} onClick={playNext} onVisible={setReady} />}
    </AnimatePresence>
  );
};

export default ShowText;
