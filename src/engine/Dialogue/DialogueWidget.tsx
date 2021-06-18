import React from 'react';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import Backdrop from '../helpers/Backdrop';
import {ISpecifiedAction, ITalkActionPayload, ITalkOptionsActionPayload} from '../actions';
import './styles/DialogueWidgetStyle.scss';
import variants from '../commons/motion/variants';
import DialogueOptionsWidget from './DialogueOptionsWidget';
import {useTypedSelector} from '../redux/store';
import {IActorId} from '../../game/actors';
import {getCurrentPoiId} from '../redux/tempSlice';
import SETTINGS from '../../game/settings';
import useActorNameCondition from '../../game/useActorNameCondition';
import imageCache from '../imageCache';
import portraits from '../../game/portraits';
// import portrait from '../../game/assets/images/portraits/salammon.png';

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

  // TODO add alt portrait name

  const {
    actor = SETTINGS.DEFAULT_ACTOR,
    actorName,
  } = action.payload;

  const poiActorId = useTypedSelector(getCurrentPoiId);
  const actorNameFromState = useActorNameCondition(actor);

  // TODO
  //  try to publish
  const portrait = portraits[actor];
  if (!portrait) {
    throw new Error('missing actor "' + actor + '" portrait file or import declaration');
  }
  imageCache.preload(portrait);

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

  const actorNameToDisplay = actorName || actorNameFromState || `[${actor}]`;


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <Backdrop
        dimmed={true}
      />
      <div
        className={classes}
        {...(!options && { onClick })}
      >
        <div className="DialogueWidget__portrait" style={{backgroundImage: `url(${portrait})`}} />
        <div className="DialogueWidget__balloon">
          <div className="DialogueWidget__name">{actorNameToDisplay}</div>
          <div className="DialogueWidget__border" />
          {options ? (
            <DialogueOptionsWidget options={options} onOptionSelect={onClick} actorId={poiActorId as IActorId} />
          ) : (
            <div>
              {text}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DialogueWidget;
