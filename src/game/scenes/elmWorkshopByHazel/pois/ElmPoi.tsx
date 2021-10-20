import React from 'react';
import Poi from '../../../../engine/Poi';
import SCENE_POIS from '../scenePois';
import ACTIONS from '../../../../engine/actions';
import {useTranslation} from '../../../../engine/translation';
import ACTORS from '../../../actors';
import SCENES from '../../../scenes';

const ElmPoi = () => {
  const t = useTranslation();

  return (
    <Poi
      id={SCENE_POIS.elm}
      style={{
        left: 122,
        top: 56,
        width: 216,
        height: 432,
      }}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.elmWorkshopByHazel.elm.examine})],
        },
        {
          name: t.verbs.talk,
          script: [
            ACTIONS.setSceneState({
              sceneId: SCENES.elmWorkshopByHazel,
              state: {
                afterFirstTalk: true,
              },
            }),
            ACTIONS.wait({duration: 1.5}),
            ACTIONS.talk({text: t.scenes.elmWorkshopByHazel.elm.talk.takeAMoment}),
            ACTIONS.talk({
              text: t.scenes.elmWorkshopByHazel.elm.talk.youAlreadyDid,
              actor: ACTORS.elm,
            }),
            ACTIONS.talk({text: t.scenes.elmWorkshopByHazel.elm.talk.dontBeSoLiteral}),
          ],
        },
      ]}
    />
  );
};

export default ElmPoi;
