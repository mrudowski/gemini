import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
//import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../../engine/translation';
//import CLOSEUPS from '../../../closeups';
import SCENE_POIS from '../scenePois';

const Equation1Poi = () => {
 // const sceneState = useSceneState(CLOSEUPS.elmDeskByElm);
  const t = useTranslation();

  return (
    <Poi
      id={SCENE_POIS.equation1}
      style={{
        left: 202 - 128,
        top: 132 - 70,
        width: 290,
        height: 124,
      }}
      // when={!sceneState.equation1Solved}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.elmDeskByElm.equation1.examine})],
        },
      ]}
    />
  );
};

export default Equation1Poi;
