import React, {useCallback, useEffect, useState} from 'react';
import {motion, useAnimation} from 'framer-motion';
import './styles/DialogueWidgetStyle.scss';
import portraits from '../../game/actors/portraits';
import PreloadImage from '../Preload/PreloadImage';
import {IActorId} from './types';
import transparentImage from '../ui/assets/images/transparent.png';

interface IDialoguePortraitWidget {
  actor: IActorId | string;
  portrait?: string | null;
}

const DialoguePortraitWidget: React.FC<IDialoguePortraitWidget> = ({actor, portrait: portraitToSet}) => {
  const prevControls = useAnimation();
  const controls = useAnimation();

  const [prevPortrait, setPrevPortrait] = useState('');
  const [portrait, setPortrait] = useState('');

  const nextPortrait = portraitToSet === null ? transparentImage : portraitToSet || portraits[actor];
  if (!nextPortrait) {
    throw new Error('missing actor "' + actor + '" portrait file or import declaration');
  }

  const play = useCallback(async () => {
    prevControls.set({
      x: 0,
      opacity: 1,
    });
    prevControls.start({
      opacity: 0,
      x: 30,
      transition: {duration: 1, ease: 'easeOut'},
    });
    controls.set({
      x: -30,
      opacity: 0,
    });
    controls.start({
      x: 0,
      opacity: 1,
      transition: {duration: 1.5, ease: 'easeOut'},
    });
  }, [controls, prevControls]);

  useEffect(() => {
    if (nextPortrait !== portrait) {
      controls.set({
        opacity: 0,
      });
      prevControls.set({
        opacity: 0,
      });
      setPrevPortrait(portrait);
      setPortrait(nextPortrait);
    }
  }, [portrait, nextPortrait, controls, prevControls]);

  useEffect(() => {
    if (portrait) {
      // console.log('%c [mr] play', 'background-color:pink; color: black');
      play();
    }
  }, [portrait, play]);

  return (
    <div className="DialogueWidget__portraitWrapper">
      {prevPortrait && <PreloadImage image={prevPortrait} />}
      {portrait && <PreloadImage image={portrait} />}
      <motion.div animate={prevControls} className="DialogueWidget__portraitBox">
        <div className="DialogueWidget__portrait" style={{backgroundImage: `url(${prevPortrait})`}} />
      </motion.div>
      <motion.div animate={controls} className="DialogueWidget__portraitBox">
        <div className="DialogueWidget__portrait" style={{backgroundImage: `url(${portrait})`}} />
      </motion.div>
    </div>
  );
};

export default DialoguePortraitWidget;
