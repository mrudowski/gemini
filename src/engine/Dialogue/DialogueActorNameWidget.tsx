import React, {useEffect} from 'react';
import {motion, useAnimation} from 'framer-motion';
import './styles/DialogueWidgetStyle.scss';
import {IActorId} from '../../game/actors';
import useGetActorNameToDisplay from './hooks/useGetActorName';

interface IDialogueActorNameWidget {
  actor: IActorId;
  actorName?: string;
}

const DialogueActorNameWidget: React.FC<IDialogueActorNameWidget> = ({actor, actorName}) => {
  const controls = useAnimation();

  const actorNameToDisplay = useGetActorNameToDisplay({
    actorId: actor,
    actorName,
  });

  useEffect(() => {
    controls.set({
      opacity: 0,
    });
    controls.start({
      opacity: 1,
      transition: {duration: 1, ease: 'easeOut'},
    });
  }, [actorNameToDisplay, controls]);

  //initial={{opacity: 0}} style={{opacity: 0}}

  return (
    <motion.div animate={controls}>
      <div className="DialogueWidget__name">{actorNameToDisplay}</div>
    </motion.div>
  );
};

export default DialogueActorNameWidget;
