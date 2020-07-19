import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {AnimatePresence, motion, usePresence} from 'framer-motion';
import './styles/DialogueWindowStyle.scss';
import Backdrop from '../helpers/Backdrop';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {getTalkAction} from '../scriptPlayer/talkActionSlice';
import {IAction, ITalkActionPayload} from '../actions';
import {endAction} from '../scriptPlayer/scriptPlayerSlice';

interface IDialogue {
  action: IAction,
  onClick
}

const Dialogue: React.FC<IDialogue> = (props) => {
  const {
    action, // TODO push payload as props
    onClick
  } = props;

  // const [isPresent, safeToRemove] = usePresence();
  //
  // useEffect(() => {
  //   !isPresent && setTimeout(safeToRemove as any, 3000);
  // }, [isPresent, safeToRemove]);

  const {
    text,
  } = action.payload as ITalkActionPayload;

  const classes = classNames(
    'DialogueWindow',
  );

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
    >
      <Backdrop onClick={onClick} dimmed={true} />
      <div
        className={classes}
      >
        <h2>Myosotis</h2>
        {text}
      </div>
    </motion.div>
  );
};

export default Dialogue;
