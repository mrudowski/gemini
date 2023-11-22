import SETTINGS from '../../game/settings';
import {ISaveGameSlotId} from './types';

export const getAutoSaveGame = () => {
  return localStorage.getItem(SETTINGS.SAVE_GAME_NAME);
};

export const getSaveGameFromSlot = (slotId: ISaveGameSlotId) => {
  return localStorage.getItem(`${SETTINGS.SAVE_GAME_NAME}_${slotId}`);
};

export const setSaveGameInSlot = (slotId: ISaveGameSlotId, gameStateToSave: Record<string, any>) => {
  localStorage.setItem(`${SETTINGS.SAVE_GAME_NAME}_${slotId}`, JSON.stringify(gameStateToSave));
};
