import React, {useCallback} from 'react';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import {useHotkeys} from 'react-hotkeys-hook';
import Backdrop from '../commons/components/Backdrop';
import './styles/DialogueWidgetStyle.scss';
import DialogueOptionsWidget from './DialogueOptionsWidget';
import {useTypedSelector} from '../redux/store';
import DialoguePortraitWidget from './DialoguePortraitWidget';
import {dialogueOptionsCinematicVariants, variants} from '../commons/motion/variants';
import DialogueActorNameWidget from './DialogueActorNameWidget';
import {getCurrentActorId} from '../World/worldSlice';
import {ISpecifiedAction} from '../actions/types';
import {ITalkActionPayload, ITalkOptionsActionPayload} from '../actions/talk/talk';

interface IDialogueWidget {
  action: ISpecifiedAction<ITalkActionPayload> | ISpecifiedAction<ITalkOptionsActionPayload>;
  // onClick: (e, next?: string, actorId?: IActorId) => void;
  onClick: (e, next?: string) => void;
  onVisible: (visible: boolean) => void;
}

const DialogueWidget: React.FC<IDialogueWidget> = ({
  action, // TODO push payload as props
  onClick,
  onVisible,
}) => {
  const currentActorId = useTypedSelector(getCurrentActorId);
  // console.log('%c [mr] DialogueWidget', 'background-color:Gold; color: black');

  const onAnimationComplete = useCallback(
    definition => {
      if (definition === 'visible') {
        onVisible(true);
      }
    },
    [onVisible]
  );

  // TODO add alt portrait name

  const {actor = currentActorId, portrait, actorName} = action.payload;

  // not so good when we have many  pois with different id !== actors!
  // const poiActorId = useTypedSelector(getCurrentPoiId);

  // const [isPresent, safeToRemove] = usePresence();
  //
  // useEffect(() => {
  //   !isPresent && setTimeout(safeToRemove as any, 3000);
  // }, [isPresent, safeToRemove]);

  const {text} = action.payload as ITalkActionPayload;

  const {options, layout} = action.payload as ITalkOptionsActionPayload;
  const cinematicLayout = layout === 'cinematic';

  const hotKeysEnabled = {
    enabled: !options,
  };
  useHotkeys(
    'esc',
    keyboardEvent => {
      // method because useHotKeys have second hotkeysEvent param
      onClick(keyboardEvent);
    },
    hotKeysEnabled
  );

  const classes = classNames('DialogueWidget', cinematicLayout && 'DialogueWidget--cinematic');

  // when added transition with static duration > 0.5
  // we omit flickering when hide/show during autoplay

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={cinematicLayout ? dialogueOptionsCinematicVariants : variants}
      onAnimationComplete={onAnimationComplete}
    >
      <Backdrop dimmed={!cinematicLayout} />
      <div className={classes} {...(!options && {onClick})}>
        {cinematicLayout ? (
          <DialogueOptionsWidget options={options} onOptionSelect={onClick} actorId={actor} layout={layout} />
        ) : (
          <>
            <DialoguePortraitWidget portrait={portrait} actor={actor} />
            <div className="DialogueWidget__balloon">
              <DialogueActorNameWidget actor={actor} actorName={actorName} />
              <div className="DialogueWidget__border" />
              {options ? (
                <DialogueOptionsWidget options={options} onOptionSelect={onClick} actorId={actor} layout={layout} />
              ) : (
                <div>{text}</div>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default DialogueWidget;
