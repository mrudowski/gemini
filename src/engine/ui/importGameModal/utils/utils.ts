import {restoreGameThunk} from '../../../redux/thunks';
import {IGameStateToRestore} from '../../../redux/types';

export const getGameStateFromAccessCodeWhenValid = (accessCode: string | undefined) => {
  if (!accessCode) {
    return null;
  }

  try {
    const gameState = JSON.parse(window.atob(accessCode)) as IGameStateToRestore;
    if (gameState.world && gameState.inventory) {
      return gameState;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const importGameState = (gameState: IGameStateToRestore, dispatch) => {
  dispatch(restoreGameThunk(gameState));
};
