import {batch} from 'react-redux';
import {getCurrentActorId, getGlobalState, setCurrentActorId} from '../../World/worldSlice';
import {endAction, playScript} from '../../scriptPlayer/scriptPlayerSlice';
import {ISwitchActorAction} from './switchActorTypes';
import ACTIONS from '../actions';
import ACTORS from '../../../game/actors/actors';
import {IThunk} from '../../redux/store';
import {IActorId} from '../../Dialogue/types';

// const getSwitchedLocation = (actorId: IActorId, sceneId: ISceneId) => {
//   if (actorId === ACTORS.elm) {
//     if (sceneId === SCENES.elmWorkshopByHazel) {
//       return SCENES.elmWorkshopByElm;
//     }
//     if (sceneId === SCENES.hazelWorkshopByHazel) {
//       return SCENES.hazelWorkshopByElm;
//     }
//     throw new Error('sceneId ' + sceneId + ' cannot be switch to Elm`s vision');
//   }
//   if (actorId === ACTORS.hazel) {
//     if (sceneId === SCENES.elmWorkshopByElm) {
//       return SCENES.elmWorkshopByHazel;
//     }
//     if (sceneId === SCENES.hazelWorkshopByElm) {
//       return SCENES.hazelWorkshopByHazel;
//     }
//     throw new Error('sceneId ' + sceneId + ' cannot be switch to Hazel`s vision');
//   }
//   throw new Error('actorId ' + actorId + ' cannot be switch');
// };

export const switchActors =
  (actorsToSwitch: 'elmHazel'): IThunk =>
  (dispatch, getState) => {
    const state = getState();
    const currentActorId = getCurrentActorId(state);
    // const currentSceneId = getCurrentSceneId(state);

    switch (actorsToSwitch) {
      case 'elmHazel': {
        const nextActorId: IActorId = currentActorId === ACTORS.elm ? ACTORS.hazel : ACTORS.elm;
        const nextSceneId =
          nextActorId === ACTORS.elm ? getGlobalState(state).elmLocation : getGlobalState(state).hazelLocation;
        console.log('%c [mr] nextSceneId', 'background-color:Gold; color: black', {
          currentActorId,
          nextActorId,
          nextSceneId,
        });
        // const nextSceneId: ISceneId = nextActorLocation || getSwitchedLocation(nextActorId, currentSceneId);
        // dispatch(saveCurrentActorLastLocationBeforeSwitch());
        dispatch(
          playScript({
            script: [ACTIONS.switchActor({actor: nextActorId}), ACTIONS.gotoScene({scene: nextSceneId})],
          })
        );
        return;
      }
      default: {
        throw new Error('actorsToSwitch not defined!');
      }
    }
  };

export const startSwitchActorAction = (action: ReturnType<ISwitchActorAction>) => dispatch => {
  const {
    payload: {actor: actorId},
  } = action;

  if (!actorId) {
    throw new Error('required "actorId" not defined for the action');
  }

  batch(() => {
    dispatch(setCurrentActorId(actorId));
    dispatch(endAction());
  });
};
