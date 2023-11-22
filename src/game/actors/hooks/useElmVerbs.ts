import ACTIONS from '../../../engine/actions/actions';
import {useActorState, useGlobalState, useSceneState} from '../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../engine/translation';
import CLOSEUPS from '../../closeups/closeups';
import SCENES from '../../scenes/scenes';
import ACTORS from '../actors';
import TALK_OPTIONS, {OPTIONS} from '../talkOptions';

const endFirstTalk = 'endFirstTalk';

const useElmTalkVerbs = () => {
  const t = useTranslation();
  const elmState = useActorState(ACTORS.elm);
  const sceneStateEquation = useSceneState(CLOSEUPS.elmDeskByElm);
  const sceneStateEquation2 = useSceneState(CLOSEUPS.hazelTableByHazel);
  const sceneState = useSceneState(CLOSEUPS.hazelTableByElm);
  const globalState = useGlobalState();

  const talkOptionsScript = [
    ACTIONS.talkOptions({
      id: OPTIONS,
      actor: ACTORS.elm,
      options: [
        {id: TALK_OPTIONS.elm.discoveryOfTheGrandchildren},
        {id: TALK_OPTIONS.elm.workshop, when: globalState.elmLocation === SCENES.elmWorkshopByElm},

        {id: TALK_OPTIONS.elm.elmWork, when: sceneStateEquation.solvedEquations < 2},
        {id: TALK_OPTIONS.elm.elmWork2, when: sceneStateEquation.solvedEquations === 2},

        {
          id: TALK_OPTIONS.elm.hazelWork,
          when: sceneStateEquation2.solvedEquations === 4 && !sceneState.hazelPuzzleSolved,
        },
        {id: TALK_OPTIONS.elm.end, next: endFirstTalk, when: !elmState.end},
        {id: TALK_OPTIONS.elm.end, when: elmState.end},
      ],
    }),

    // discoveryOfTheGrandchildren ------------------------------------

    ACTIONS.talk({
      id: TALK_OPTIONS.elm.discoveryOfTheGrandchildren,
      text: t.scenes.elmWorkshopByHazel.elm.talk.discoveryOfTheGrandchildren,
    }),
    ACTIONS.talk({
      actor: ACTORS.elm,
      text: t.scenes.elmWorkshopByHazel.elm.talk.discoveryOfTheGrandchildrenAnswer,
      next: OPTIONS,
    }),

    // workshop ------------------------------------

    ACTIONS.talk({
      id: TALK_OPTIONS.elm.workshop,
      text: t.scenes.elmWorkshopByHazel.elm.talk.workshopElm1,
    }),
    ACTIONS.talk({
      actor: ACTORS.elm,
      text: t.scenes.elmWorkshopByHazel.elm.talk.workshopElm2,
      next: OPTIONS,
    }),

    // elmWork ------------------------------------

    ACTIONS.talk({
      id: TALK_OPTIONS.elm.elmWork,
      text: t.scenes.elmWorkshopByHazel.elm.talk.elmWork,
    }),
    ACTIONS.talk({
      actor: ACTORS.elm,
      text: t.scenes.elmWorkshopByHazel.elm.talk.elmWorkAnswer,
      next: OPTIONS,
    }),

    // elmWork2 ------------------------------------

    ACTIONS.talk({
      id: TALK_OPTIONS.elm.elmWork2,
      text: t.scenes.elmWorkshopByHazel.elm.talk.elmWork,
    }),
    ACTIONS.talk({
      actor: ACTORS.elm,
      text: t.scenes.elmWorkshopByHazel.elm.talk.elmWorkAnswer2,
    }),
    ACTIONS.talk({
      text: t.scenes.elmWorkshopByHazel.elm.talk.elmWorkAnswer2b,
      next: OPTIONS,
    }),

    // hazelWork ------------------------------------

    ACTIONS.talk({
      id: TALK_OPTIONS.elm.hazelWork,
      text: t.scenes.elmWorkshopByHazel.elm.talk.hazelWork,
    }),
    ACTIONS.talk({
      actor: ACTORS.elm,
      text: t.scenes.elmWorkshopByHazel.elm.talk.hazelWorkAnswer,
      next: OPTIONS,
    }),

    // endFirstTalk ------------------------------------

    ACTIONS.setGlobalState({
      id: endFirstTalk,
      state: {
        showElmHazelSwitch: true,
      },
    }),
    ACTIONS.talk({
      text: t.scenes.elmWorkshopByHazel.elm.talk.hazelEndDialog,
    }),
  ];

  return [
    {
      name: t.verbs.examine,
      script: [ACTIONS.talk({text: t.scenes.elmWorkshopByHazel.elm.examine})],
    },

    {
      name: t.verbs.talk,
      when: !elmState.end,
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
        ...talkOptionsScript,
      ],
    },
    {
      name: t.verbs.talk,
      when: elmState.end,
      script: [ACTIONS.talk({text: t.scenes.elmWorkshopByHazel.elm.talk.canWeTalk}), ...talkOptionsScript],
    },
  ];
};

export default useElmTalkVerbs;
