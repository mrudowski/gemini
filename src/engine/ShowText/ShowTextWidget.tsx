import React, {useCallback} from 'react';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import {useHotkeys} from 'react-hotkeys-hook';
import Backdrop from '../commons/components/Backdrop';
import './styles/ShowTextWidgetStyle.scss';
import {showTextVariants} from '../commons/motion/variants';
import {ISpecifiedAction} from '../actions/types';
import {ITalkActionPayload, ITalkOptionsActionPayload} from '../actions/talk/talk';
import {IShowTextActionPayload} from '../actions/showText/showText';

interface IDialogueWidget {
  action: ISpecifiedAction<ITalkActionPayload> | ISpecifiedAction<ITalkOptionsActionPayload>;
  // onClick: (e, next?: string, actorId?: IActorId) => void;
  onClick: (e, next?: string) => void;
  onVisible: (visible: boolean) => void;
}

const ShowTextWidget: React.FC<IDialogueWidget> = ({
  action, // TODO push payload as props
  onClick,
  onVisible,
}) => {
  const onAnimationComplete = useCallback(
    definition => {
      if (definition === 'visible') {
        onVisible(true);
      }
    },
    [onVisible]
  );

  const {text, style, position} = action.payload as IShowTextActionPayload;

  useHotkeys('esc', keyboardEvent => {
    // method because useHotKeys have second hotkeysEvent param
    onClick(keyboardEvent);
  });

  const classes = classNames('ShowTextWidget', `ShowTextWidget--${position}`);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={showTextVariants}
      onAnimationComplete={onAnimationComplete}
    >
      <Backdrop />
      <div className={classes} onClick={onClick}>
        <div className="ShowTextWidget__balloon" style={style}>
          {text}
        </div>
      </div>
    </motion.div>
  );
};

export default ShowTextWidget;
