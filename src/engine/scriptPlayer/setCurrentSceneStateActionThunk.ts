import {ISetSceneStateActionPayload, ISpecifiedAction} from '../actions';
import {IThunk} from '../redux/store';
import {endAction} from './scriptPlayerSlice';
import {setSceneState} from '../redux/worldSlice';
import {getCurrentSceneId} from '../redux/gemSlice';

type ISetSceneStateAction<T> = ISpecifiedAction<ISetSceneStateActionPayload<T>>;

export const startSetCurrentSceneStateAction = <T>({action}: {action: ISetSceneStateAction<T>}): IThunk => (dispatch, getState) => {
  console.log('%c [mr] startSetCurrentSceneStateAction', 'background-color:Gold; color: black', action);

  const {payload: {stateName, stateValue}} = action;

  if (!stateName || stateValue === undefined) {
    throw new Error('required "stateName" or "stateValue" not defined for the action');
  }

  const state = getState();
  const sceneId = getCurrentSceneId(state);
  dispatch(setSceneState({
    sceneId,
    stateName: stateName as string,
    stateValue
  }));

  dispatch(endAction());

  // not needed - will be add as separate and standalone action
  // dispatch(startWaitAction({
  //   durationInMs: 1000,
  //   stateName: stateName as string,
  //   stateValue
  // }));
  //       gem.action.next();
  //     });
};

export const endSetCurrentSceneStateAction = (): IThunk => () => {
  console.log('%c [mr] endSetCurrentSceneStateAction', 'background-color:Gold; color: black');
};
