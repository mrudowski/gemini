import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../../engine/translation';
import CLOSEUPS from '../../../closeups/closeups';
import SCENE_POIS from '../scenePois';

const TablePoi = () => {
  const t = useTranslation();
  const sceneState = useSceneState(CLOSEUPS.hazelTableByElm);

  return (
    <Poi
      id={SCENE_POIS.table}
      style={{
        left: 264,
        top: 453,
        width: 394,
        height: 207,
      }}
      hotspot={{
        left: 40,
        top: 25,
        width: 300,
        height: 180,
      }}
      verbs={[
        {
          name: t.verbs.examine,
          script: [
            ACTIONS.talk({text: t.scenes.hazelWorkshopByHazel.table.examine, when: !sceneState.drawerStartOff}),
            ACTIONS.talk({
              text: t.scenes.hazelWorkshopByHazel.table.examineElm,
              when: sceneState.drawerStartOff && !sceneState.hazelPuzzleSolved,
            }),
            ACTIONS.talk({text: t.scenes.hazelWorkshopByHazel.table.examineSolved, when: sceneState.hazelPuzzleSolved}),
          ],
        },
        {
          name: t.verbs.lookCloser,
          when: !sceneState.drawerStartOff,
          script: [ACTIONS.lookCloser({scene: CLOSEUPS.hazelTableByHazel})],
        },
      ]}
    />
  );
};

export default TablePoi;
