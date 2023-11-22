import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useTranslation} from '../../../../engine/translation';
import SCENE_POIS from '../scenePois';
import CLOSEUPS from '../../closeups';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import CUSTOM_ACTIONS from '../../../customActions';

const AbacusWhitePoi = () => {
  const t = useTranslation();
  const {paramA} = useSceneState(CLOSEUPS.elmDeskByElm);

  return (
    <Poi
      id={SCENE_POIS.abacusWhite}
      style={{
        left: 142 - 128,
        top: 369 - 70,
        width: 356,
        height: 131,
      }}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.elmDeskByHazel.abacusWhite.examine})],
        },
        {
          name: t.verbs.add,
          when: paramA < 4,
          script: [
            ACTIONS.setSceneState({
              scene: CLOSEUPS.elmDeskByElm,
              state: {paramA: paramA + 1},
            }),
            ACTIONS.custom({
              action: CUSTOM_ACTIONS.checkElmEquation,
            }),
          ],
        },
        {
          name: t.verbs.subtract,
          when: paramA > 0,
          script: [
            ACTIONS.setSceneState({
              scene: CLOSEUPS.elmDeskByElm,
              state: {paramA: paramA - 1},
            }),
            ACTIONS.custom({
              action: CUSTOM_ACTIONS.checkElmEquation,
            }),
          ],
        },
      ]}
    />
  );
};

export default AbacusWhitePoi;
