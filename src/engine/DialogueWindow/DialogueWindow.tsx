import React, {useCallback, useEffect, useState} from 'react';
import {AnimatePresence} from 'framer-motion';
import './styles/DialogueWindowStyle.scss';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {getTalkAction} from '../scriptPlayer/talkActionSlice';
import {endAction} from '../scriptPlayer/scriptPlayerSlice';
import Dialogue from './Dialogue';

interface IDialogueWindow {
}

const DialogueWindow: React.FC<IDialogueWindow> = (props) => {
  // const {
  // } = props;

  const action = useTypedSelector(getTalkAction);
  const dispatch = useTypedDispatch();
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    setShow(!!action);
  }, [action]);

  const onClick = useCallback(() => {
    // TODO we should get nextAction at start and here check if the same
    //  if the same then we should play it without setShowfalse etc...

    setShow(false);
  }, []);

  //const isActive = !!action;
  if (!action) return null;

  const onExitComplete = () => {
    dispatch(endAction());
  };

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isShow &&
        <Dialogue
          action={action}
          onClick={onClick}
        />
      }
    </AnimatePresence>
  );
};

export default DialogueWindow;
