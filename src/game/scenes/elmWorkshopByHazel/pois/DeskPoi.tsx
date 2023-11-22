import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useActorState, useGlobalState, useSceneState} from '../../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../../engine/translation';
import ACTORS from '../../../actors/actors';
import CLOSEUPS from '../../../closeups/closeups';
import SCENES from '../../scenes';
import SCENE_POIS from '../scenePois';

const DeskPoi = () => {
  const t = useTranslation();
  const elmState = useActorState(ACTORS.elm);
  const hazelState = useActorState(ACTORS.hazel);
  const sceneState = useSceneState(CLOSEUPS.elmDeskByElm);
  const globalState = useGlobalState();
  // const elmPuzzleSolved = sceneState.solvedEquations === 4;

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
      when={!sceneState.elmPuzzleSolved}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.elmWorkshopByHazel.desk.examine})],
        },
        {
          name: t.verbs.lookCloser,
          when: !elmState.elmWork2 && !hazelState.elmWork && globalState.elmLocation === SCENES.elmWorkshopByElm,
          script: [
            ACTIONS.talk({text: t.scenes.elmWorkshopByHazel.desk.canIHelp}),
            ACTIONS.talk({
              text: t.scenes.elmWorkshopByHazel.desk.IHaveToUnderstand,
              actor: ACTORS.elm,
            }),
          ],
        },
        {
          name: t.verbs.lookCloser,
          when: elmState.elmWork2 || hazelState.elmWork,
          script: [ACTIONS.lookCloser({scene: CLOSEUPS.elmDeskByHazel})],
        },
      ]}
    />
  );
};

export default DeskPoi;
