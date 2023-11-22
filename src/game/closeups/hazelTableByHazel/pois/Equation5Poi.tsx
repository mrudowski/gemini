import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../../engine/translation';
import CLOSEUPS from '../../closeups';
import equation5Image from '../assets/images/equation5.png';
import SCENE_POIS from '../scenePois';

const Equation5Poi = () => {
  const sceneState = useSceneState(CLOSEUPS.hazelTableByHazel);
  const t = useTranslation();

  return (
    <Poi
      id={SCENE_POIS.equation5}
      style={{
        left: 130 - 128,
        top: 134 - 70,
        width: 421,
        height: 478,
      }}
      image={equation5Image}
      when={sceneState.solvedEquations === 4}
      //when={sceneState.equation4Solved && !sceneState.equation5Solved} - warunek negujący będzie wynikał od Elma, gdyz to on rozwiaze zagadke
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.hazelTableByHazel.equation5.examine})],
        },
      ]}
    />
  );
};

export default Equation5Poi;
