import React from 'react';
import classNames from 'classnames';
import {AnimatePresence, motion} from 'framer-motion';
import './styles/DialogueWindowStyle.scss'
import Backdrop from '../helpers/Backdrop';

interface IDialogueWindow {
}

const DialogueWindow: React.FC<IDialogueWindow> = (props) => {
  // const {
  // } = props;

//  const verbMenuData = useTypedSelector(getVerbMenuData);
 // const dispatch = useTypedDispatch();

  const closeMenu = () => {
    //dispatch(closeVerbMenu());
  }

  const classes = classNames(
    'DialogueWindow',
  );

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  return (
    <AnimatePresence>
      {false && (
        <>
          <Backdrop onClick={closeMenu} />
          <motion.div
            className={classes}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
          >
            dialogue...
          </motion.div>
        </>
        )}
    </AnimatePresence>
  );
}

export default DialogueWindow;
