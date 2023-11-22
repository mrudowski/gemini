import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useTranslation} from '../../../../engine/translation';
import SCENE_POIS from '../scenePois';
import CLOSEUPS from '../../closeups';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import CUSTOM_ACTIONS from '../../../customActions';

const AbacusBlackPoi = () => {
  const t = useTranslation();
  const {paramB} = useSceneState(CLOSEUPS.elmDeskByElm);

  return (
    <Poi
      id={SCENE_POIS.abacusBlack}
      style={{
        left: 142 - 128,
        top: 513 - 70,
        width: 356,
        height: 131,
      }}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.elmDeskByHazel.abacusBlack.examine})],
        },
        {
          name: t.verbs.add,
          when: paramB < 4,
          script: [
            ACTIONS.setSceneState({
              scene: CLOSEUPS.elmDeskByElm,
              state: {paramB: paramB + 1},
            }),
            ACTIONS.custom({
              action: CUSTOM_ACTIONS.checkElmEquation,
            }),
          ],
        },
        {
          name: t.verbs.subtract,
          when: paramB > 0,
          script: [
            ACTIONS.setSceneState({
              scene: CLOSEUPS.elmDeskByElm,
              state: {paramB: paramB - 1},
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

export default AbacusBlackPoi;
