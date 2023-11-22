import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {getTalkAction} from '../actions/talk/talkActionSlice';
import {endAction} from '../scriptPlayer/scriptPlayerSlice';
import DialogueWidget from './DialogueWidget';
import {ACTIONS_NAMES} from '../actions/actionsNames';
import useAutoPlayAfter from '../commons/hooks/useAutoPlayAfter';
import {getNextActiveAction} from '../scriptPlayer/scriptPlayerSliceSelectors';
import {END} from '../actions/constants';
import usePlayNextCoolDown from '../commons/hooks/usePlayNextCoolDown';

interface IDialogue {}

const Dialogue: React.FC<IDialogue> = () => {
  const action = useTypedSelector(getTalkAction);
  const nextAction = useTypedSelector(getNextActiveAction);
  const dispatch = useTypedDispatch();
  const [isShow, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  const nextRef = useRef('');

  useEffect(() => {
    setShow(!!action);
  }, [action]);

  const {playNextReadyRef} = usePlayNextCoolDown({deps: action, delayInMs: 500});

  const onExitComplete = useCallback(
    (next = '', playNextOverCurrent = false) => {
      const trueNext = next || nextRef.current;
      dispatch(endAction({next: trueNext, playNextOverCurrent}));
      nextRef.current = '';
    },
    [dispatch]
  );

  const playNext = useCallback(
    (e?, next = '') => {
      if (!playNextReadyRef.current) {
        return;
      }
      // gently animated closing
      if (!nextAction || next === END) {
        if (next === END) {
          nextRef.current = END;
        }
        setShow(false);
        return;
      }

      // gently animated closing
      // to play nice with cinematic TalkOptions
      if (next && nextAction.actionName === ACTIONS_NAMES.SHOW_TEXT) {
        nextRef.current = next;
        setShow(false);
        return;
      }

      // playing next talk action without closing and opening animation
      if (
        nextAction.actionName === ACTIONS_NAMES.END_TALK ||
        nextAction.actionName === ACTIONS_NAMES.TALK ||
        nextAction.actionName === ACTIONS_NAMES.TALK_OPTIONS
      ) {
        onExitComplete(next, false);
        return;
      }

      onExitComplete(next, true);
    },
    [onExitComplete, nextAction, playNextReadyRef]
  );

  useAutoPlayAfter({
    action,
    playNext,
    ready,
  });

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isShow && action && <DialogueWidget action={action} onClick={playNext} onVisible={setReady} />}
    </AnimatePresence>
  );
};

export default Dialogue;
