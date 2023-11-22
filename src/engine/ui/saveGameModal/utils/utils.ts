import {ISaveGame} from '../types';
import getGameStateToSave from '../../utils/getGameStateToSave';
import {IWorldState} from '../../../../game/worldState';
import {ISaveGameSlotId} from '../../../saveGameStorage/types';
import {getSaveGameFromSlot, setSaveGameInSlot} from '../../../saveGameStorage/saveGameStorageUtils';

export const saveGameStateToLocal = (slotId: ISaveGameSlotId, title: string = slotId) => {
  const gameStateToSave = getGameStateToSave(title);
  if (gameStateToSave) {
    setSaveGameInSlot(slotId, gameStateToSave);
  }
};

const SLOTS_AMOUNT = 3;

// -----------------------------------------

export const isAnyCustomSaveGame = () => {
  for (let slotId = 1; slotId <= SLOTS_AMOUNT; slotId++) {
    const gameStateAsJSON = getSaveGameFromSlot(slotId.toString() as ISaveGameSlotId);
    if (gameStateAsJSON) {
      return true;
    }
  }
  return false;
};

// -----------------------------------------

export const getSaveGames = () => {
  const saveGames: ISaveGame[] = [];

  for (let slotId = 1; slotId <= SLOTS_AMOUNT; slotId++) {
    const gameStateAsJSON = getSaveGameFromSlot(slotId.toString() as ISaveGameSlotId);
    const id = (slotId + '') as ISaveGameSlotId;
    if (gameStateAsJSON) {
      const gameState = JSON.parse(gameStateAsJSON);
      saveGames.push({
        id,
        title: gameState.gem.save.title,
        date: gameState.gem.save.date,
        sceneId: (gameState.world as IWorldState).currentSceneId,
      });
    } else {
      saveGames.push({
        id,
        title: '',
        date: '',
        sceneId: '',
      });
    }
  }

  return saveGames;
};
