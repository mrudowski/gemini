import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../../engine/translation';
import CLOSEUPS from '../../../closeups/closeups';
import SCENE_POIS from '../scenePois';

const DeskPoi = () => {
  const t = useTranslation();
  const sceneState = useSceneState(CLOSEUPS.elmDeskByElm);
  const sceneState2 = useSceneState(CLOSEUPS.elmDeskByHazel);
  //const elmPuzzleSolved = sceneState.solvedEquations === 4;

  return (
    <Poi
      id={SCENE_POIS.desk}
      style={{
        left: 460,
        top: 489,
        width: 413,
        height: 149,
      }}
      hotspot={{
        left: 30,
        top: 10,
        width: 350,
        height: 100,
      }}
    
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.elmWorkshopByElm.desk.examine, when: !sceneState.elmPuzzleSolved}),
            ACTIONS.talk({text: t.scenes.elmWorkshopByElm.desk.examineSolved, when: sceneState.elmPuzzleSolved})],
        },

        {
          name: t.verbs.lookCloser,
          when:!sceneState2.hazelEquatOn,
          script: [
            ACTIONS.lookCloser({scene: CLOSEUPS.elmDeskByElm}),
          ],
        },
      ]}
    />
  );
};

export default DeskPoi;
