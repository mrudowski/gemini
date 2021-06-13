import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {getTalkAction} from '../scriptPlayer/talkActionSlice';
import {endAction, getNextActiveAction} from '../scriptPlayer/scriptPlayerSlice';
import DialogueWidget from './DialogueWidget';
import {ACTIONS_NAMES, ISpecifiedAction, ITalkActionPayload} from '../actions';

interface IDialogueWindow {
}

let timeoutId;

const Dialogue: React.FC<IDialogueWindow> = () => {
  // const {
  // } = props;

  const action = useTypedSelector(getTalkAction);
  const nextAction = useTypedSelector(getNextActiveAction);
  const dispatch = useTypedDispatch();
  const [isShow, setShow] = useState(false);
  const nextRef = useRef('');

  useEffect(() => {
    console.log('%c [mr] useEffect', 'background-color:Gold; color: black', action);
    setShow(!!action);
  }, [action]);

  const onExitComplete = useCallback((next = '', playNextOverCurrent = false) => {
    const trueNext = next || nextRef.current;
    console.log('%c [mr] onExitComplete ------>', 'background-color:Gold; color: black', trueNext);
    dispatch(endAction({next: trueNext, playNextOverCurrent}));
    nextRef.current = '';
  }, [dispatch]);

  const playNext = useCallback((e?, next = '') => {
    // gently animated closing
    if (!nextAction || next === 'end') {
      if (next === 'end') {
        nextRef.current = 'end';
      }
      setShow(false);
      return;
    }
    if (nextAction.actionName === ACTIONS_NAMES.TALK || nextAction.actionName === ACTIONS_NAMES.TALK_OPTIONS) {
      // playing next talk action without closing and opening animation
      console.log('%c [mr] playNext talk', 'background-color:green; color: white', nextAction.id, next);
      onExitComplete(next, false);
    } else {
      // playing next action without close dialogue
      // good for setCurrentSceneState, wait, etc
      console.log('%c [mr] playNext', 'background-color:green; color: white', nextAction.id, next);
      onExitComplete(next, true);
    }
  }, [onExitComplete, nextAction]);

  const {
    autoPlayAfter = false
  } = action ? ((action as ISpecifiedAction<ITalkActionPayload>).payload) : {};

  useEffect(() => {
    console.log('%c [mr] useEffect', 'background-color:red; color: black', playNext);
    if (autoPlayAfter) {
      timeoutId = setTimeout(() => {
        playNext();
      }, autoPlayAfter * 1000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [autoPlayAfter, playNext]);

  // const isActive = !!action;
  //if (!action) return null;

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isShow && action &&
        <DialogueWidget
          action={action}
          // onClick={(action.payload as ITalkOptionsActionPayload).options ? emptyMethod : playNext}
          onClick={playNext}
        />
      }
    </AnimatePresence>
  );
};

export default Dialogue;
