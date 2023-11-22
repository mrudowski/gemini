import {gotoScene} from './gotoScene/gotoScene';
import {switchActor} from './switchActor/switchActor';
import {wait} from './wait/wait';
import {switchLightOff, switchLightOn} from './switchLight/switchLight';
import {playSound} from './playSound/playSound';
import {addItems, removeItems, replaceItems} from './inventoryActions/inventoryActions';
import {endUseWith, useWith} from './useWith/useWith';
import {endTalk, talk, talkOptions} from './talk/talk';
import {setSceneState} from './setSceneState/setSceneState';
import {setGlobalState} from './setGlobalState/setGlobalState';
import {closeCloseup, lookCloser} from './lookCloser/lookCloser';
import {showText} from './showText/showText';
import {resumeScene} from './resumeScene/resumeScene';
import {hideAllImages, hideImage, showImage} from './showImage/showImage';
import {custom} from './custom/custom';
import {addNotes} from './notebookActions/notebookActions';
import {shakeCamera} from './shakeCamera/shakeCamera';
import {showCredits} from './showCredits/showCredits';
import {hideHud, showHud} from './hudActions/hudActions';

const ACTIONS = {
  gotoScene,
  resumeScene,
  lookCloser,
  closeCloseup,
  setGlobalState,
  setSceneState,
  // setSceneMultiState,
  // setCurrentSceneState,
  showText,
  showImage,
  hideImage,
  hideAllImages,
  talk,
  talkOptions,
  endTalk,
  wait,
  useWith,
  endUseWith,
  addItems,
  removeItems,
  replaceItems,
  addNotes,
  playSound,
  switchLightOff,
  switchLightOn,
  shakeCamera,
  switchActor,
  showCredits,
  custom,
  showHud,
  hideHud,
};

export default ACTIONS;
