import ACTIONS from '../../../engine/actions/actions';
import {IThunk} from '../../../engine/redux/store';
import {playScript} from '../../../engine/scriptPlayer/scriptPlayerSlice';
import T from '../../../engine/translation';
import {getSceneState} from '../../../engine/World/worldSlice';
import ACTORS from '../../actors/actors';
import SCENES from '../../scenes/scenes';
import {IWorldState} from '../../worldState';
import CLOSEUPS from '../closeups';

export const checkElmEquation = (): IThunk => (dispatch, getState) => {
  const t = T();
  const state = getState();
  const {solvedEquations, paramA, paramB} = getSceneState(
    state,
    CLOSEUPS.elmDeskByElm
  ) as IWorldState['scenes']['elmDeskByElm'];

  switch (solvedEquations) {
    case 0: {
      if (paramA === 3) {
        dispatch(
          playScript({
            script: [
              ACTIONS.wait({duration: 1}),
              ACTIONS.talk({
                actor: ACTORS.elm,
                text: t.scenes.elmDeskByElm.equationSolved,
              }),
              ACTIONS.setSceneState({
                scene: CLOSEUPS.elmDeskByElm,
                state: {solvedEquations: solvedEquations + 1},
              }),
            ],
          })
        );
      }
      return;
    }
    case 1: {
      if (paramA === 1) {
        dispatch(
          playScript({
            script: [
              ACTIONS.wait({duration: 1}),
              ACTIONS.talk({
                actor: ACTORS.elm,
                text: t.scenes.elmDeskByElm.equationSolved2,
              }),
              ACTIONS.endTalk(),
              ACTIONS.setSceneState({
                scene: CLOSEUPS.elmDeskByElm,
                state: {solvedEquations: solvedEquations + 1},
              }),
              ACTIONS.wait({duration: 2}),
              ACTIONS.talk({
                actor: ACTORS.elm,
                text: t.scenes.elmDeskByElm.equationSolved2B,
              }),
            ],
          })
        );
      }
      return;
    }

    // TODO for Elm and Hazel in the same place

    case 2: {
      if (paramA === 1 && paramB === 3) {
        dispatch(
          playScript({
            script: [
              ACTIONS.wait({duration: 1}),
              ACTIONS.talk({
                actor: ACTORS.hazel,
                text: t.scenes.elmDeskByElm.equationSolved3,
              }),
              ACTIONS.setSceneState({
                scene: CLOSEUPS.elmDeskByElm,
                state: {solvedEquations: solvedEquations + 1},
              }),
            ],
          })
        );
      }
      return;
    }
    case 3: {
      if (paramA === 4 && paramB === 2) {
        dispatch(
          playScript({
            script: [
              ACTIONS.wait({duration: 1}),
              ACTIONS.talk({
                actor: ACTORS.hazel,
                text: t.scenes.elmDeskByElm.equationSolved4,
              }),
              ACTIONS.setSceneState({
                scene: CLOSEUPS.elmDeskByElm,
                state: {solvedEquations: solvedEquations + 1},
              }),
            ],
          })
        );
      }
      return;
    }
    case 4: {
      if (paramA === 2 && paramB === 0) {
        dispatch(
          playScript({
            script: [
              ACTIONS.wait({duration: 1}),
              ACTIONS.talk({
                actor: ACTORS.hazel,
                text: t.scenes.elmDeskByElm.equationSolved5,
              }),
              ACTIONS.talk({
                actor: ACTORS.elm,
                text: t.scenes.elmDeskByElm.howDidYouDo,
              }),
              ACTIONS.endTalk(),
              ACTIONS.setGlobalState({state: {elmLocation: SCENES.elmWorkshopByElm}}),
              ACTIONS.setSceneState({
                scene: CLOSEUPS.elmDeskByElm,
                state: {
                  elmPuzzleSolved: true,
                },
              }),
              ACTIONS.closeCloseup(),
              ACTIONS.wait({duration: 1}),
              ACTIONS.talk({
                actor: ACTORS.hazel,
                text: t.scenes.elmDeskByElm.theForestbedChanged,
              }),
              ACTIONS.talk({
                actor: ACTORS.elm,
                text: t.scenes.elmDeskByElm.butItwWantBeLaw,
              }),
              ACTIONS.talk({
                actor: ACTORS.hazel,
                text: t.scenes.elmDeskByElm.notNecceserly,
              }),
              ACTIONS.talk({
                actor: ACTORS.elm,
                text: t.scenes.elmDeskByElm.maybeYouAre,
              }),
              ACTIONS.talk({
                actor: ACTORS.hazel,
                text: t.scenes.elmDeskByElm.dontMentionIt,
              }),
              ACTIONS.endTalk(),
            ],
          })
        );
      }
      return;
    }
  }
};
