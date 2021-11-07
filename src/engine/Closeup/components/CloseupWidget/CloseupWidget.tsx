import React, {Suspense, useCallback, useMemo} from 'react';
import {motion} from 'framer-motion';
import Backdrop from '../../../helpers/Backdrop';
import {variants} from '../../../commons/motion/variants';
import './styles/CloseupWidgetStyle.scss';
import {capitalizeFirstLetter} from '../../../utils/utils';
import {endAction} from '../../../scriptPlayer/scriptPlayerSlice';
import {useTypedDispatch} from '../../../redux/store';
import {startCloseCloseupAction} from '../../lookCloserActionSlice';

interface ICloseupWidget {
  sceneId;
}

const CloseupWidget: React.FC<ICloseupWidget> = ({sceneId}) => {
  const dispatch = useTypedDispatch();

  const SceneComponent = useMemo(() => {
    return React.lazy(() => import(`../../../../game/scenes/${sceneId}/${capitalizeFirstLetter(sceneId || '')}Scene`));
  }, [sceneId]);

  const onAnimationComplete = useCallback(() => {
    dispatch(endAction());
  }, [dispatch]);

  const closeCloseup = useCallback(() => {
    dispatch(startCloseCloseupAction());
  }, [dispatch]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      onAnimationComplete={onAnimationComplete}
      className="CloseupWidget"
    >
      <Backdrop dimmed={true} onClick={closeCloseup} />
      <div className="CloseupWidget__window">
        <Suspense fallback={<div>loading...</div>}>
          <SceneComponent />
        </Suspense>
        <div className="CloseupWidget__border" />
      </div>
    </motion.div>
  );
};

export default CloseupWidget;
