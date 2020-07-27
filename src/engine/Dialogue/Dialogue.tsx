import React, {useCallback, useEffect, useState} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {getTalkAction} from '../scriptPlayer/talkActionSlice';
import {endAction} from '../scriptPlayer/scriptPlayerSlice';
import DialogueWidget from './DialogueWidget';

interface IDialogueWindow {
}

const Dialogue: React.FC<IDialogueWindow> = (props) => {
  // const {
  // } = props;

  const action = useTypedSelector(getTalkAction);
  const dispatch = useTypedDispatch();
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    setShow(!!action);
  }, [action]);

  const onExitComplete = useCallback(() => {
    dispatch(endAction());
  }, [dispatch]);

  const onClick = useCallback(() => {
    // TODO we should get nextAction at start and here check if the same
    //  if the same then we should play it without setShowfalse etc...

    if (true) {
      onExitComplete();
    } else {
      setShow(false);
    }
  }, [onExitComplete]);

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
