import React from 'react';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import Backdrop from '../helpers/Backdrop';
import {IAction, ITalkActionPayload} from '../actions';
import './styles/DialogueWidgetStyle.scss';
import variants from '../commons/motion/variants';

interface IDialogue {
  action: IAction,
  onClick
}

const DialogueWidget: React.FC<IDialogue> = (props) => {
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
    'DialogueWidget',
  );

  // when added transition with static duration > 0.5
  // we omit flickering when hide/show during autoplay

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      transition={{ duration: 0.5 }}
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

export default DialogueWidget;
