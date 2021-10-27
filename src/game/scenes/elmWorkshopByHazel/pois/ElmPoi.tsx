import React from 'react';
import Poi from '../../../../engine/Poi';
import SCENE_POIS from '../scenePois';
import ACTIONS from '../../../../engine/actions';
import {useTranslation} from '../../../../engine/translation';
import ACTORS from '../../../actors';
import SCENES from '../../../scenes';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import TALK_OPTIONS from '../../../talkOptions';

const ElmPoi = () => {
  const t = useTranslation();
  const sceneState = useSceneState(SCENES.elmWorkshopByHazel);

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
          when: !sceneState.afterFirstTalk,
          script: [
            ACTIONS.setSceneState({
              scene: SCENES.elmWorkshopByHazel,
              state: {
                hazelOnDesk: true,
              },
            }),
            ACTIONS.wait({duration: 1.5}),
            ACTIONS.talk({text: t.scenes.elmWorkshopByHazel.elm.talk.takeAMoment}),
            ACTIONS.talk({
              text: t.scenes.elmWorkshopByHazel.elm.talk.youAlreadyDid,
              actor: ACTORS.elm,
            }),
            ACTIONS.talk({text: t.scenes.elmWorkshopByHazel.elm.talk.dontBeSoLiteral}),
            ACTIONS.talk({
              text: t.scenes.elmWorkshopByHazel.elm.talk.howIsYourWork,
              actor: ACTORS.elm,
            }),
            ACTIONS.talk({text: t.scenes.elmWorkshopByHazel.elm.talk.notTooEasy}),
            ACTIONS.setSceneState({
              scene: SCENES.elmWorkshopByHazel,
              state: {
                afterFirstTalk: true,
              },
            }),
            ACTIONS.talk({text: t.scenes.elmWorkshopByHazel.elm.talk.notTooEasy}),
          ],
        },
        {
          name: t.verbs.talk,
          when: sceneState.afterFirstTalk,
          script: [
            ACTIONS.talk({text: t.scenes.elmWorkshopByHazel.elm.talk.canWeTalk}),
            ACTIONS.talkOptions({
              id: 'talkOptions',
              actor: ACTORS.elm,
              options: [{id: TALK_OPTIONS.myo}, {id: TALK_OPTIONS.discoveryOfTheGrandchildren}, {id: TALK_OPTIONS.end}],
            }),
          ],
        },
      ]}
    />
  );
};

export default ElmPoi;
