import React from 'react';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import Backdrop from '../helpers/Backdrop';
import {ISpecifiedAction, ITalkActionPayload, ITalkOptionsActionPayload} from '../actions';
import './styles/DialogueWidgetStyle.scss';
import variants from '../commons/motion/variants';
import DialogueOptionsWidget from './DialogueOptionsWidget';
import T from '../translation';
import {useTypedSelector} from '../redux/store';
import {IActorId} from '../../game/actors';
import {getCurrentPoiId} from '../redux/tempSlice';
import SETTINGS from '../../game/settings';
import ACTORS from '../../game/actors';
import {getActorState} from '../redux/worldSlice';

interface IDialogue {
  action: ISpecifiedAction<ITalkActionPayload> | ISpecifiedAction<ITalkOptionsActionPayload>,
  onClick: (e, next?: string, actorId?: IActorId) => void,
}

const DialogueWidget: React.FC<IDialogue> = (props) => {
  const {
    action, // TODO push payload as props
    onClick
  } = props;

  console.log('%c [mr] DialogueWidget', 'background-color:Gold; color: black');

  const {
    actor = SETTINGS.DEFAULT_ACTOR,
    actorName,
  } = action.payload;

  const poiActorId = useTypedSelector(getCurrentPoiId);
  const actorState = useTypedSelector(getActorState(actor));

  const actorName2 = actorState.salammon ? 'SAL' : '???';


  // const [isPresent, safeToRemove] = usePresence();
  //
  // useEffect(() => {
  //   !isPresent && setTimeout(safeToRemove as any, 3000);
  // }, [isPresent, safeToRemove]);

  const {
    text,
  } = action.payload as ITalkActionPayload;

  const {
    options
  } = action.payload as ITalkOptionsActionPayload;

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
      <Backdrop
        {...(!options && { onClick })}
        dimmed={true}
      />
      <div
        className={classes}
      >
        <h2>{actorName || T().actors[actor] || `[${actor}]`} {actorName2}</h2>
        {options ? (
          <DialogueOptionsWidget options={options} onOptionSelect={onClick} actorId={poiActorId as IActorId} />
        ) : (
          <div>
            {text}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DialogueWidget;
