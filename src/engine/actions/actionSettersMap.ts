import {ACTIONS_NAMES, IActionName} from './actionsNames';
import {endGotoSceneAction, startGotoSceneAction} from './gotoScene/gotoSceneActionThunk';
import {
  endCloseCloseupAction,
  endLookCloserAction,
  startCloseCloseupAction,
  startLookCloserAction,
} from '../closeup/CloseupViewer/lookCloserActionSlice';
import {startSetSceneStateAction} from './setSceneState/setSceneStateActionThunk';
import {endTalkAction, startTalkAction} from './talk/talkActionSlice';
import {endWaitAction, startWaitAction} from './wait/waitActionSlice';
import {endUseWithAction, startUseWithAction} from '../Inventory/useWithActionSlice';
import {
  endItemsAction,
  startAddItemsAction,
  startRemoveItemsAction,
  startReplaceItemsAction,
} from '../Inventory/inventorySlice';
import {playSoundAction} from '../sound/soundSlice';
import {
  endSwitchOffLightAction,
  endSwitchOnLightAction,
  startSwitchOffLightAction,
  startSwitchOnLightAction,
} from './switchLight/switchLightActionSlice';
import {startSwitchActorAction} from './switchActor/switchActorActionThunk';
import {endShowTextAction, startShowTextAction} from './showText/showTextActionSlice';
import {resumeSceneAction} from './resumeScene/resumeSceneActionThunk';
import {
  endHideAllImagesAction,
  endHideImageAction,
  endShowImageAction,
  startHideAllImagesAction,
  startHideImageAction,
  startShowImageAction,
} from './showImage/showImageActionSlice';
import {startSetGlobalStateAction} from './setGlobalState/setGlobalStateActionThunk';
import {startCustomAction} from './custom/customActionThunk';
import {endAddNotesAction, startAddNotesAction} from '../notebook/notebookSlice';
import {endShakeCameraAction, startShakeCameraAction} from './shakeCamera/shakeCameraActionSlice';
import {startShowCreditsAction} from './showCredits/showCreditsActionSlice';
import {startHideHudAction, startShowHudAction} from './hudActions/hudActionsThunks';

const actionSettersMap: Record<IActionName, {startAction; endAction}> = {
  [ACTIONS_NAMES.GOTO_SCENE]: {
    startAction: startGotoSceneAction,
    endAction: endGotoSceneAction,
  },
  [ACTIONS_NAMES.RESUME_SCENE]: {
    startAction: resumeSceneAction,
    endAction: null,
  },
  [ACTIONS_NAMES.LOOK_CLOSER]: {
    startAction: startLookCloserAction,
    endAction: endLookCloserAction,
  },
  [ACTIONS_NAMES.CLOSE_CLOSEUP]: {
    startAction: startCloseCloseupAction,
    endAction: endCloseCloseupAction,
  },
  [ACTIONS_NAMES.SET_GLOBAL_STATE]: {
    startAction: startSetGlobalStateAction,
    endAction: null,
  },
  [ACTIONS_NAMES.SET_SCENE_STATE]: {
    startAction: startSetSceneStateAction,
    endAction: null,
  },
  // [ACTIONS_NAMES.SET_CURRENT_SCENE_STATE]: {
  //   startAction: startSetCurrentSceneStateAction,
  //   endAction: endSetCurrentSceneStateAction, // null
  // },
  [ACTIONS_NAMES.SHOW_TEXT]: {
    startAction: startShowTextAction,
    endAction: endShowTextAction,
  },
  [ACTIONS_NAMES.TALK]: {
    startAction: startTalkAction,
    endAction: endTalkAction,
  },
  [ACTIONS_NAMES.TALK_OPTIONS]: {
    startAction: startTalkAction,
    endAction: endTalkAction,
  },
  [ACTIONS_NAMES.END_TALK]: {
    startAction: endTalkAction, // TODO dirty
    endAction: endTalkAction, // never called?
  },
  [ACTIONS_NAMES.WAIT]: {
    startAction: startWaitAction,
    endAction: endWaitAction,
  },
  [ACTIONS_NAMES.USE_WITH]: {
    startAction: startUseWithAction,
    endAction: null, // only here we come up with this approach
  },
  [ACTIONS_NAMES.END_USE_WITH]: {
    startAction: endUseWithAction,
    endAction: null, // only here we come up with this approach
  },
  [ACTIONS_NAMES.ADD_ITEMS]: {
    startAction: startAddItemsAction,
    endAction: endItemsAction,
  },
  [ACTIONS_NAMES.REMOVE_ITEMS]: {
    startAction: startRemoveItemsAction,
    endAction: endItemsAction,
  },
  [ACTIONS_NAMES.REPLACE_ITEMS]: {
    startAction: startReplaceItemsAction,
    endAction: endItemsAction,
  },
  [ACTIONS_NAMES.ADD_NOTES]: {
    startAction: startAddNotesAction,
    endAction: endAddNotesAction,
  },
  [ACTIONS_NAMES.PLAY_SOUND]: {
    startAction: playSoundAction,
    endAction: null,
  },
  [ACTIONS_NAMES.SWITCH_LIGHT_OFF]: {
    startAction: startSwitchOffLightAction,
    endAction: endSwitchOffLightAction,
  },
  [ACTIONS_NAMES.SWITCH_LIGHT_ON]: {
    startAction: startSwitchOnLightAction,
    endAction: endSwitchOnLightAction,
  },
  [ACTIONS_NAMES.SHAKE_CAMERA]: {
    startAction: startShakeCameraAction,
    endAction: endShakeCameraAction,
  },
  [ACTIONS_NAMES.SWITCH_ACTOR]: {
    startAction: startSwitchActorAction,
    endAction: null,
  },
  [ACTIONS_NAMES.SHOW_CREDITS]: {
    startAction: startShowCreditsAction,
    endAction: null,
  },
  [ACTIONS_NAMES.SHOW_IMAGE]: {
    startAction: startShowImageAction,
    endAction: endShowImageAction,
  },
  [ACTIONS_NAMES.HIDE_IMAGE]: {
    startAction: startHideImageAction,
    endAction: endHideImageAction,
  },
  [ACTIONS_NAMES.HIDE_ALL_IMAGES]: {
    startAction: startHideAllImagesAction,
    endAction: endHideAllImagesAction,
  },
  [ACTIONS_NAMES.CUSTOM]: {
    startAction: startCustomAction,
    endAction: null,
  },
  [ACTIONS_NAMES.SHOW_HUD]: {
    startAction: startShowHudAction,
    endAction: null,
  },
  [ACTIONS_NAMES.HIDE_HUD]: {
    startAction: startHideHudAction,
    endAction: null,
  },
};

export default actionSettersMap;
