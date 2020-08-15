import React, {useCallback, useEffect, useState} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {getTalkAction} from '../scriptPlayer/talkActionSlice';
import {endAction, getNextActiveAction} from '../scriptPlayer/scriptPlayerSlice';
import DialogueWidget from './DialogueWidget';

interface IDialogueWindow {
}

const Dialogue: React.FC<IDialogueWindow> = (props) => {
  // const {
  // } = props;

  const action = useTypedSelector(getTalkAction);
  const nextAction = useTypedSelector(getNextActiveAction);
  const dispatch = useTypedDispatch();
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    setShow(!!action);
  }, [action]);

  const onExitComplete = useCallback(() => {
    dispatch(endAction());
  }, [dispatch]);

  const onClick = useCallback(() => {
    if (nextAction?.id === 'talk') {
      // without animation
      onExitComplete();
    } else {
      // with fade animation
      setShow(false);
    }
  }, [onExitComplete, nextAction]);

  //const isActive = !!action;
  if (!action) return null;

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isShow &&
        <DialogueWidget
          action={action}
          onClick={onClick}
        />
      }
    </AnimatePresence>
  );
};

export default Dialogue;
