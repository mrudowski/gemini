import React, {useEffect} from 'react';
import {motion, useAnimation} from 'framer-motion';
import './styles/DialogueWidgetStyle.scss';
import {IActorId} from '../../game/actors';
import useActorNameCondition from '../../game/useActorNameCondition';

interface IDialogueActorNameWidget {
  actor: IActorId,
  actorName?: string
}

const DialogueActorNameWidget: React.FC<IDialogueActorNameWidget> = ({
  actor,
  actorName
}) => {

  const controls = useAnimation();

  // TODO make a new hook - use it in devDialogueTree
  const actorNameFromState = useActorNameCondition(actor);
  const actorNameToDisplay = actorName || actorNameFromState || `[${actor}]`;
  console.log('%c [mr]', 'background-color:Gold; color: black', actorNameFromState);
  console.log('%c [mr]', 'background-color:Gold; color: black', actorNameToDisplay);
  console.log('%c [mr]', 'background-color:Gold; color: black', actorName);
  console.log('%c [mr]', 'background-color:Gold; color: black', actor);

  useEffect(() => {
    controls.set({
      opacity: 0,
    });
    controls.start({
      opacity: 1,
      transition: {duration: 1, ease: 'easeOut'},
    });
  }, [actorNameToDisplay, controls]);

  return (
    <motion.div
      animate={controls}
    >
      <div className="DialogueWidget__name">{actorNameToDisplay}</div>
    </motion.div>
  );
};

export default DialogueActorNameWidget;
