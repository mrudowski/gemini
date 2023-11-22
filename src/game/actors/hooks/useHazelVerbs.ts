import ACTIONS from '../../../engine/actions/actions';
import {useGlobalState, useSceneState} from '../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../engine/translation';
import CLOSEUPS from '../../closeups/closeups';
import SCENES from '../../scenes/scenes';
import ACTORS from '../actors';
import TALK_OPTIONS, {OPTIONS} from '../talkOptions';

const useHazelVerbs = () => {
  const t = useTranslation();
  const sceneStateEquation = useSceneState(CLOSEUPS.elmDeskByElm);
  const sceneStateEquation2 = useSceneState(CLOSEUPS.hazelTableByHazel);
  const sceneState = useSceneState(CLOSEUPS.hazelTableByElm);
  const globalState = useGlobalState();

  const talkOptionsScript = [
    ACTIONS.talkOptions({
      id: OPTIONS,
      actor: ACTORS.hazel,
      options: [
        {id: TALK_OPTIONS.hazel.firstborn},
        {id: TALK_OPTIONS.hazel.workshop, when: globalState.hazelLocation === SCENES.hazelWorkshopByHazel},
        {id: TALK_OPTIONS.hazel.elmWork, when: sceneStateEquation.solvedEquations === 2},
        {id: TALK_OPTIONS.hazel.hazelWork, when: sceneStateEquation2.solvedEquations < 4},
        {
          id: TALK_OPTIONS.hazel.hazelWork2,
          when: sceneStateEquation2.solvedEquations === 4 && !sceneState.hazelPuzzleSolved,
        },
        {id: TALK_OPTIONS.hazel.end},
      ],
    }),
    // firstborn ------------------------------------

    ACTIONS.talk({
      id: TALK_OPTIONS.hazel.firstborn,
      text: t.scenes.elmWorkshopByHazel.elm.talk.firstborn1,
    }),
    ACTIONS.talk({
      actor: ACTORS.hazel,
      text: t.scenes.elmWorkshopByHazel.elm.talk.firstborn2,
    }),
    ACTIONS.talk({
      text: t.scenes.elmWorkshopByHazel.elm.talk.firstborn3,
    }),
    ACTIONS.talk({
      actor: ACTORS.hazel,
      text: t.scenes.elmWorkshopByHazel.elm.talk.firstborn4,
      next: OPTIONS,
    }),

    // workshop ------------------------------------

    ACTIONS.talk({
      id: TALK_OPTIONS.hazel.workshop,
      text: t.scenes.elmWorkshopByHazel.elm.talk.workshopHazel1,
    }),
    ACTIONS.talk({
      actor: ACTORS.hazel,
      text: t.scenes.elmWorkshopByHazel.elm.talk.workshopHazel2,
      next: OPTIONS,
    }),

    // elmWork ------------------------------------

    ACTIONS.talk({
      id: TALK_OPTIONS.hazel.elmWork,
      text: t.scenes.elmWorkshopByHazel.elm.talk.elmWorkAnswer2,
    }),
    ACTIONS.talk({
      actor: ACTORS.hazel,
      text: t.scenes.elmWorkshopByHazel.elm.talk.elmWorkAnswer2b,
      next: OPTIONS,
    }),

    // hazelWork ------------------------------------

    ACTIONS.talk({
      id: TALK_OPTIONS.hazel.hazelWork,
      text: t.scenes.elmWorkshopByElm.hazel.talk.hazelWork,
    }),
    ACTIONS.talk({
      actor: ACTORS.hazel,
      text: t.scenes.elmWorkshopByElm.hazel.talk.hazelWorkAnswer,
      next: OPTIONS,
    }),

    // hazelWork2 ------------------------------------

    ACTIONS.talk({
      id: TALK_OPTIONS.hazel.hazelWork2,
      text: t.scenes.elmWorkshopByElm.hazel.talk.hazelWork2,
    }),
    ACTIONS.talk({
      actor: ACTORS.hazel,
      text: t.scenes.elmWorkshopByHazel.elm.talk.hazelWork,
    }),
    ACTIONS.talk({
      text: t.scenes.elmWorkshopByHazel.elm.talk.hazelWorkAnswer,
      next: OPTIONS,
    }),
  ];

  return [
    {
      name: t.verbs.examine,
      script: [ACTIONS.talk({text: t.scenes.elmWorkshopByElm.hazel.examine})],
    },

    {
      name: t.verbs.talk,
      script: [ACTIONS.talk({text: t.scenes.elmWorkshopByElm.hazel.talk.canWeTalk}), ...talkOptionsScript],
    },
  ];
};

export default useHazelVerbs;
