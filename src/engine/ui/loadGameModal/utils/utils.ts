import {continueGameThunk, restoreGameThunk} from '../../../redux/thunks';
import {getSaveGameFromSlot} from '../../../saveGameStorage/saveGameStorageUtils';
import {ISaveGameSlotId} from '../../../saveGameStorage/types';

export const loadGameStateFromLocal = (slotId: ISaveGameSlotId, dispatch) => {
  if (slotId === 'auto') {
    dispatch(continueGameThunk());
    return;
  }
  const gameStateAsJSON = getSaveGameFromSlot(slotId);
  if (gameStateAsJSON) {
    dispatch(restoreGameThunk(JSON.parse(gameStateAsJSON)));
  }
};
