import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useActorState, useSceneState} from '../../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../../engine/translation';
import ACTORS from '../../../actors/actors';
import CLOSEUPS from '../../../closeups/closeups';
import SCENE_POIS from '../scenePois';

const TablePoi = () => {
  const t = useTranslation();
  const elmState = useActorState(ACTORS.elm);
  const hazelState = useActorState(ACTORS.hazel);
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
            ACTIONS.talk({text: t.scenes.hazelWorkshopByElm.table.examine, when: !sceneState.hazelPuzzleSolved}),
            ACTIONS.talk({text: t.scenes.hazelWorkshopByElm.table.examineSolved, when: sceneState.hazelPuzzleSolved}),
          ],
        },
        {
          name: t.verbs.lookCloser,
          when:
            (elmState.hazelWork && !sceneState.hazelPuzzleSolved) ||
            (hazelState.hazelWork2 && !sceneState.hazelPuzzleSolved),
          script: [ACTIONS.lookCloser({scene: CLOSEUPS.hazelTableByElm})],
        },
      ]}
    />
  );
};

export default TablePoi;
