import React, {useCallback, useEffect, useState} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {getTalkAction} from '../scriptPlayer/talkActionSlice';
import {endAction, getNextActiveAction} from '../scriptPlayer/scriptPlayerSlice';
import DialogueWidget from './DialogueWidget';
import {ISpecifiedAction, ITalkActionPayload} from '../actions';

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

  useEffect(() => {
    console.log('%c [mr] useEffect', 'background-color:Gold; color: black', action);
    setShow(!!action);
  }, [action]);

  const onExitComplete = useCallback((playNextOverCurrent = false) => {
    console.log('%c [mr] onExitComplete', 'background-color:Gold; color: black');
    dispatch(endAction(playNextOverCurrent));
  }, [dispatch]);

  const playNext = useCallback((e?, next?) => {
    if (next) {
      console.log('%c [mr] TODO next', 'background-color:Gold; color: black', next);
    }

    if (!nextAction) {
      setShow(false);
      return;
    }
    if (nextAction.id === 'talk') {
      // without animation
      onExitComplete();
    } else {
      // playing next action without close dialogue
      // good for setCurrentSceneState, wait, etc
      onExitComplete(true);
    }
  }, [onExitComplete, nextAction]);

  const {
    autoPlayAfter = false
  } = action ? ((action as ISpecifiedAction<ITalkActionPayload>).payload) : {};

  useEffect(() => {
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
