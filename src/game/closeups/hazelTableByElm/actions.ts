import ACTIONS from '../../../engine/actions/actions';
import {IThunk} from '../../../engine/redux/store';
import {playScript} from '../../../engine/scriptPlayer/scriptPlayerSlice';
import T from '../../../engine/translation';
import {getSceneState} from '../../../engine/World/worldSlice';
import ACTORS from '../../actors/actors';
import SCENES from '../../scenes/scenes';
import {IWorldState} from '../../worldState';
import CLOSEUPS from '../closeups';

export const checkHazelEquationByElm = (): IThunk => (dispatch, getState) => {
  const t = T();
  const state = getState();
  const {solvedEquations, FlowerBox, LeafBox, StalkBox} = getSceneState(
    state,
    CLOSEUPS.hazelTableByElm
  ) as IWorldState['scenes']['hazelTableByElm'];

  switch (solvedEquations) {
    case 0: {
      if (FlowerBox === 1 && LeafBox === 4 && StalkBox === 2) {
        dispatch(
          playScript({
            script: [
              ACTIONS.wait({duration: 1}),
              ACTIONS.talk({
                text: t.scenes.hazelTableByElm.equationSolved,
              }),
              ACTIONS.talk({
                actor: ACTORS.hazel,
                text: t.scenes.hazelTableByElm.equationSolved2,
              }),
              ACTIONS.endTalk(),
              ACTIONS.setGlobalState({state: {hazelLocation: SCENES.hazelWorkshopByHazel}}),
              ACTIONS.setSceneState({
                scene: CLOSEUPS.hazelTableByElm,
                state: {
                  hazelPuzzleSolved: true,
                },
              }),
              ACTIONS.closeCloseup(),
              ACTIONS.wait({duration: 1}),
              ACTIONS.talk({
                text: t.scenes.hazelTableByElm.equationSolved3,
              }),
              ACTIONS.talk({
                actor: ACTORS.hazel,
                text: t.scenes.hazelTableByElm.equationSolved4,
              }),
              ACTIONS.talk({
                text: t.scenes.hazelTableByElm.equationSolved5,
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
