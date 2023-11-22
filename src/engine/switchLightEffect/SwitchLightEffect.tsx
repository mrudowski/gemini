import React, {useCallback} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useTypedDispatch} from '../redux/store';
import {endAction} from '../scriptPlayer/scriptPlayerSlice';
import {ILightOff} from '../actions/switchLight/switchLightActionSlice';
import './styles/SwitchLightEffect.scss';

interface ISwitchSceneLightEffect {
  lightOff: ILightOff | null;
}

const SwitchLightEffect: React.FC<ISwitchSceneLightEffect> = ({lightOff}) => {
  const {style = undefined, switchOnDuration = 1, switchOffDuration = 1} = lightOff || {};
  const dispatch = useTypedDispatch();

  const endActionAfterAnimationEnd = useCallback(() => {
    dispatch(endAction());
  }, [dispatch]);

  const sceneLightEffectVariants = {
    // on/off duration is misleading but it's ok
    hidden: {opacity: 0, transition: {duration: switchOnDuration}},
    visible: {opacity: 1, transition: {duration: switchOffDuration}},
  };

  return (
    <AnimatePresence>
      {lightOff && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={sceneLightEffectVariants}
          className="SwitchLightEffect"
          style={style}
          onAnimationComplete={endActionAfterAnimationEnd}
        />
      )}
    </AnimatePresence>
  );
};

export default SwitchLightEffect;
