import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../../engine/translation';
import CLOSEUPS from '../../closeups';
import equation4Image from '../assets/images/equation4.png';
import SCENE_POIS from '../scenePois';

const Equation4Poi = () => {
  const sceneState = useSceneState(CLOSEUPS.hazelTableByHazel);
  const t = useTranslation();

  return (
    <Poi
      id={SCENE_POIS.equation4}
      style={{
        left: 130 - 128,
        top: 134 - 70,
        width: 421,
        height: 478,
      }}
      image={equation4Image}
      when={sceneState.solvedEquations === 3}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.hazelTableByHazel.equation1.examine})],
        },
      ]}
    />
  );
};

export default Equation4Poi;
