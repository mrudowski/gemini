import {IActorId} from '../engine/Dialogue/types';
import {INotebookPageId} from '../engine/notebook/types';
import ISceneState, {sceneInitialState} from '../engine/redux/SceneState';
import {ISceneId} from '../engine/scene/Scene/types';
import {actorsInitialState, IActorsState} from '../engine/World/worldStateUtils';
import CLOSEUPS from './closeups/closeups';
import {elmDeskByElmSceneInitialState, IElmDeskByElmSceneState} from './closeups/elmDeskByElm/state';
import {elmDeskByHazelSceneInitialState, IElmDeskByHazelSceneState} from './closeups/elmDeskByHazel/state';
import {hazelTableByElmSceneInitialState, IHazelTableByElmSceneState} from './closeups/hazelTableByElm/state';
import {hazelTableByHazelSceneInitialState, IHazelTableByHazelSceneState} from './closeups/hazelTableByHazel/state';
import {elmWorkshopByHazelSceneInitialState, IElmWorkshopByHazelSceneState} from './scenes/elmWorkshopByHazel/state';
import {
  hazelWorkshopByHazelSceneInitialState,
  IHazelWorkshopByHazelSceneState,
} from './scenes/hazelWorkshopByHazel/state';
import {IIntroductionSceneState, introductionSceneInitialState} from './scenes/introduction/state';
import SCENES from './scenes/scenes';
import SETTINGS from './settings';

export interface IWorldState {
  currentSceneId: ISceneId;
  previousSceneId: ISceneId | null;
  currentActorId: IActorId;
  scenes: {
    [SCENES.introduction]: IIntroductionSceneState;
    [SCENES.mainMenu]: ISceneState;
    [SCENES.elmWorkshopByHazel]: IElmWorkshopByHazelSceneState;
    [SCENES.elmWorkshopByElm]: ISceneState;
    [SCENES.hazelWorkshopByHazel]: IHazelWorkshopByHazelSceneState;
    [SCENES.hazelWorkshopByElm]: ISceneState;

    [CLOSEUPS.hazelTableByHazel]: IHazelTableByHazelSceneState;
    [CLOSEUPS.hazelTableByElm]: IHazelTableByElmSceneState;
    [CLOSEUPS.elmDeskByElm]: IElmDeskByElmSceneState;
    [CLOSEUPS.elmDeskByHazel]: IElmDeskByHazelSceneState;
  };
  actors: IActorsState;
  global: {
    showElmHazelSwitch: boolean;
    showHerbariumTrigger: boolean;
    herbariumActivePage: number;
    hazelLocation: typeof SCENES.hazelWorkshopByHazel | typeof SCENES.elmWorkshopByHazel;
    elmLocation: typeof SCENES.elmWorkshopByElm | typeof SCENES.hazelWorkshopByElm;
    organizedNotebook: boolean;
    organizedNotebookActivePage: INotebookPageId;
    day: number;
    day02MapUnlock: boolean;
  };
}

export const worldInitialState: IWorldState = {
  currentSceneId: SETTINGS.INTRO_SCENE,
  previousSceneId: null,
  currentActorId: SETTINGS.DEFAULT_ACTOR,
  scenes: {
    [SCENES.introduction]: introductionSceneInitialState,
    [SCENES.mainMenu]: sceneInitialState,
    [SCENES.elmWorkshopByHazel]: elmWorkshopByHazelSceneInitialState,
    [SCENES.elmWorkshopByElm]: sceneInitialState,
    [SCENES.hazelWorkshopByHazel]: hazelWorkshopByHazelSceneInitialState,
    [SCENES.hazelWorkshopByElm]: sceneInitialState,

    [CLOSEUPS.hazelTableByHazel]: hazelTableByHazelSceneInitialState,
    [CLOSEUPS.hazelTableByElm]: hazelTableByElmSceneInitialState,
    [CLOSEUPS.elmDeskByElm]: elmDeskByElmSceneInitialState,
    [CLOSEUPS.elmDeskByHazel]: elmDeskByHazelSceneInitialState,
  },
  actors: actorsInitialState, // we can remove it - and have smaller initial state
  global: {
    showElmHazelSwitch: false,
    showHerbariumTrigger: false,
    herbariumActivePage: 1,
    hazelLocation: SCENES.hazelWorkshopByHazel,
    elmLocation: SCENES.elmWorkshopByElm,
    organizedNotebook: false,
    organizedNotebookActivePage: 'todoList',
    day02MapUnlock: false,
    day: 0,
  },
};
