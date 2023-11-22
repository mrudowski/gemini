import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../../engine/translation';
import CLOSEUPS from '../../closeups';
import equation1Image from '../assets/images/equation1.png';
import SCENE_POIS from '../scenePois';

const Equation1Poi = () => {
  const sceneState = useSceneState(CLOSEUPS.hazelTableByHazel);
  const t = useTranslation();

  return (
    <Poi
      id={SCENE_POIS.equation1}
      style={{
        left: 130 - 128,
        top: 134 - 70,
        width: 421,
        height: 478,
      }}
      image={equation1Image}
      when={sceneState.solvedEquations === 0}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.hazelTableByHazel.equation1.examine})],
        },
      ]}
    />
  );
};

export default Equation1Poi;
