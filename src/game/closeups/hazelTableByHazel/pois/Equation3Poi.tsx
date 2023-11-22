import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../../engine/translation';
import CLOSEUPS from '../../closeups';
import equation3Image from '../assets/images/equation3.png';
import SCENE_POIS from '../scenePois';

const Equation3Poi = () => {
  const sceneState = useSceneState(CLOSEUPS.hazelTableByHazel);
  const t = useTranslation();

  return (
    <Poi
      id={SCENE_POIS.equation3}
      style={{
        left: 130 - 128,
        top: 134 - 70,
        width: 421,
        height: 478,
      }}
      image={equation3Image}
      when={sceneState.solvedEquations === 2}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.hazelTableByHazel.equation1.examine})],
        },
      ]}
    />
  );
};

export default Equation3Poi;
