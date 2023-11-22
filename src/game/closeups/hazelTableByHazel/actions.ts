import ACTIONS from '../../../engine/actions/actions';
import {IThunk} from '../../../engine/redux/store';
import {playScript} from '../../../engine/scriptPlayer/scriptPlayerSlice';
import T from '../../../engine/translation';
import {getSceneState} from '../../../engine/World/worldSlice';
import CLOSEUPS from '../closeups';
import {IWorldState} from '../../worldState';
import {IAction} from '../../../engine/actions/types';
import {hazelTableByHazelSceneBoxesInitialState} from './state';

export const checkHazelEquationByHazel = (): IThunk => (dispatch, getState) => {
  const t = T();
  const state = getState();
  const {
    solvedEquations,
    redFlowerBox,
    blueFlowerBox,
    yellowFlowerBox,
    greenLeafBox,
    yellowLeafBox,
    purpleLeafBox,
    blueStalkBox,
    pinkStalkBox,
    greenStalkBox,
  } = getSceneState(state, CLOSEUPS.hazelTableByHazel) as IWorldState['scenes']['hazelTableByHazel'];

  const nextEquationActions: IAction[] = [
    ACTIONS.setSceneState({
      scene: CLOSEUPS.hazelTableByHazel,
      state: {...hazelTableByHazelSceneBoxesInitialState, solvedEquations: solvedEquations + 1},
    }),
  ];

  switch (solvedEquations) {
    case 0: {
      if (
        redFlowerBox === 3 &&
        blueFlowerBox === 0 &&
        yellowFlowerBox === 0 &&
        greenLeafBox === 0 &&
        yellowLeafBox === 0 &&
        purpleLeafBox === 0 &&
        blueStalkBox === 0 &&
        pinkStalkBox === 0 &&
        greenStalkBox === 0
      ) {
        dispatch(
          playScript({
            script: [
              ACTIONS.wait({duration: 1}),
              ACTIONS.talk({
                text: t.scenes.hazelTableByHazel.equation1Solved,
              }),
              ...nextEquationActions,
            ],
          })
        );
      }
      return;
    }
    case 1: {
      if (
        redFlowerBox === 2 &&
        blueFlowerBox === 0 &&
        yellowFlowerBox === 0 &&
        greenLeafBox === 0 &&
        yellowLeafBox === 0 &&
        purpleLeafBox === 0 &&
        blueStalkBox === 1 &&
        pinkStalkBox === 0 &&
        greenStalkBox === 0
      ) {
        dispatch(
          playScript({
            script: [
              ACTIONS.wait({duration: 1}),
              ACTIONS.talk({
                text: t.scenes.hazelTableByHazel.equation2Solved,
              }),
              ...nextEquationActions,
            ],
          })
        );
      }
      return;
    }
    case 2: {
      if (
        redFlowerBox === 0 &&
        blueFlowerBox === 1 &&
        yellowFlowerBox === 0 &&
        greenLeafBox === 0 &&
        yellowLeafBox === 4 &&
        purpleLeafBox === 0 &&
        blueStalkBox === 0 &&
        pinkStalkBox === 0 &&
        greenStalkBox === 0
      ) {
        dispatch(
          playScript({
            script: [
              ACTIONS.wait({duration: 1}),
              ACTIONS.talk({
                text: t.scenes.hazelTableByHazel.equation3Solved,
              }),
              ...nextEquationActions,
            ],
          })
        );
      }
      return;
    }
    case 3: {
      if (
        redFlowerBox === 0 &&
        blueFlowerBox === 2 &&
        yellowFlowerBox === 3 &&
        greenLeafBox === 0 &&
        yellowLeafBox === 0 &&
        purpleLeafBox === 4 &&
        blueStalkBox === 5 &&
        pinkStalkBox === 0 &&
        greenStalkBox === 0
      ) {
        dispatch(
          playScript({
            script: [
              ACTIONS.wait({duration: 1}),
              ACTIONS.talk({
                text: t.scenes.hazelTableByHazel.equation4Solved,
              }),
              ...nextEquationActions,
            ],
          })
        );
      }
      return;
    }
  }
};
