import {getCurrentDate} from '../../commons/utils/utils';
import {getAutoSaveGame} from '../../saveGameStorage/saveGameStorageUtils';

const getGameStateToSave = (title: string) => {
  const gameStateAsJSON = getAutoSaveGame();
  if (gameStateAsJSON) {
    const gameState = JSON.parse(gameStateAsJSON);
    // removing `_persist`, replacing full gem with gem save
    const gameStateToSave = {
      gem: {
        save: {
          date: getCurrentDate(),
          title,
        },
      },
      // yes, because it's doubled JSON.stringify
      world: JSON.parse(gameState.world),
      inventory: JSON.parse(gameState.inventory),
      notebook: JSON.parse(gameState.notebook),
    };
    return gameStateToSave;
  }
  return null;
};

export default getGameStateToSave;
