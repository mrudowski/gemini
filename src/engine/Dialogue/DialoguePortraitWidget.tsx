import React, {useEffect} from 'react';
import {motion, useAnimation} from 'framer-motion';
import './styles/DialogueWidgetStyle.scss';
import {IActorId} from '../../game/actors';
import portraits from '../../game/portraits';
import PreloadImage from '../Preload/PreloadImage';

interface IDialoguePortraitWidget {
  actor: IActorId;
}

const DialoguePortraitWidget: React.FC<IDialoguePortraitWidget> = ({actor}) => {
  const controls = useAnimation();

  const portrait = portraits[actor];
  if (!portrait) {
    throw new Error('missing actor "' + actor + '" portrait file or import declaration');
  }

  useEffect(() => {
    //controls.stop();
    controls.set({
      x: -30,
      opacity: 0,
    });
    controls.start({
      x: 0,
      opacity: 1,
      transition: {duration: 1, ease: 'easeOut'},
    });
  }, [portrait, controls]);

  return (
    <motion.div animate={controls}>
      <PreloadImage image={portrait} />
      <div className="DialogueWidget__portrait" style={{backgroundImage: `url(${portrait})`}} />
    </motion.div>
  );
};

export default DialoguePortraitWidget;
