import React, {useCallback, useEffect, useState} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {getTalkAction} from '../scriptPlayer/talkActionSlice';
import {endAction, getNextActiveAction} from '../scriptPlayer/scriptPlayerSlice';
import DialogueWidget from './DialogueWidget';

interface IDialogueWindow {
}

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
    dispatch(endAction(playNextOverCurrent));
  }, [dispatch]);

  const onClick = useCallback(() => {
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

  //const isActive = !!action;
  //if (!action) return null;

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isShow && action &&
        <DialogueWidget
          action={action}
          onClick={onClick}
        />
      }
    </AnimatePresence>
  );
};

export default Dialogue;
