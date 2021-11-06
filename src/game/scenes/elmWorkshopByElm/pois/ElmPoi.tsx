import React from 'react';
import Poi from '../../../../engine/Poi';
import SCENE_POIS from '../scenePois';
import ACTIONS from '../../../../engine/actions';
import {useTranslation} from '../../../../engine/translation';
import ACTORS from '../../../actors';
import SCENES from '../../../scenes';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import TALK_OPTIONS, {OPTIONS} from '../../../talkOptions';

const ElmPoi = () => {
  const t = useTranslation();
  const sceneState = useSceneState(SCENES.elmWorkshopByHazel);

  const talkOptionsScript = [
    ACTIONS.talkOptions({
      id: OPTIONS,
      actor: ACTORS.elm,
      options: [
        {id: TALK_OPTIONS.discoveryOfTheGrandchildren},
        {id: TALK_OPTIONS.elmWork},
        {id: TALK_OPTIONS.endFirstTalk},
        {id: TALK_OPTIONS.end},
      ],
    }),
    ACTIONS.talk({
      id: TALK_OPTIONS.discoveryOfTheGrandchildren,
      text: t.scenes.elmWorkshopByHazel.elm.talk.discoveryOfTheGrandchildren,
    }),
    ACTIONS.talk({
      actor: ACTORS.elm,
      text: t.scenes.elmWorkshopByHazel.elm.talk.discoveryOfTheGrandchildrenAnswer,
      next: OPTIONS,
    }),
    ACTIONS.talk({
      id: TALK_OPTIONS.elmWork,
      text: t.scenes.elmWorkshopByHazel.elm.talk.elmWork,
    }),
    ACTIONS.talk({
      actor: ACTORS.elm,
      text: t.scenes.elmWorkshopByHazel.elm.talk.elmWorkAnswer,
      next: OPTIONS,
    }),
    ACTIONS.setWorldState({
      id: TALK_OPTIONS.endFirstTalk,
      state: {
        showElmHazelSwitch: true,
      },
    }),
  ];

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
            ...talkOptionsScript,
          ],
        },
        {
          name: t.verbs.talk,
          when: sceneState.afterFirstTalk,
          script: [ACTIONS.talk({text: t.scenes.elmWorkshopByHazel.elm.talk.canWeTalk}), ...talkOptionsScript],
        },
      ]}
    />
  );
};

export default ElmPoi;
