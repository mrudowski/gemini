import React from 'react';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import Backdrop from '../helpers/Backdrop';
import {ISpecifiedAction, ITalkActionPayload, ITalkOptionsActionPayload} from '../actions';
import './styles/DialogueWidgetStyle.scss';
import DialogueOptionsWidget from './DialogueOptionsWidget';
import {useTypedSelector} from '../redux/store';
import {IActorId} from '../../game/actors';
import {getCurrentPoiId} from '../redux/tempSlice';
import DialoguePortraitWidget from './DialoguePortraitWidget';
import {variants} from '../commons/motion/variants';
import DialogueActorNameWidget from './DialogueActorNameWidget';
import {getCurrentActorId} from '../redux/worldSlice';

// import portrait from '../../game/assets/images/portraits/salammon.png';

interface IDialogue {
  action: ISpecifiedAction<ITalkActionPayload> | ISpecifiedAction<ITalkOptionsActionPayload>;
  onClick: (e, next?: string, actorId?: IActorId) => void;
}

const DialogueWidget: React.FC<IDialogue> = props => {
  const {
    action, // TODO push payload as props
    onClick,
  } = props;

  const currentActorId = useTypedSelector(getCurrentActorId);
  // console.log('%c [mr] DialogueWidget', 'background-color:Gold; color: black');

  // TODO add alt portrait name

  const {actor = currentActorId, actorName} = action.payload;

  const poiActorId = useTypedSelector(getCurrentPoiId);

  // const [isPresent, safeToRemove] = usePresence();
  //
  // useEffect(() => {
  //   !isPresent && setTimeout(safeToRemove as any, 3000);
  // }, [isPresent, safeToRemove]);

  const {text} = action.payload as ITalkActionPayload;

  const {options} = action.payload as ITalkOptionsActionPayload;

  const classes = classNames('DialogueWidget');

  // when added transition with static duration > 0.5
  // we omit flickering when hide/show during autoplay

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" variants={variants}>
      <Backdrop dimmed={true} />
      <div className={classes} {...(!options && {onClick})}>
        <DialoguePortraitWidget actor={actor} />
        <div className="DialogueWidget__balloon">
          <DialogueActorNameWidget actor={actor} actorName={actorName} />
          <div className="DialogueWidget__border" />
          {options ? (
            <DialogueOptionsWidget options={options} onOptionSelect={onClick} actorId={poiActorId as IActorId} />
          ) : (
            <div>{text}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DialogueWidget;
