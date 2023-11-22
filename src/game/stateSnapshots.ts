import merge from 'lodash.merge';
import {IGameStateToRestore, IPartialGameStateToRestore} from '../engine/redux/types';
import {inventoryInitialState} from './inventory/inventoryState';
import SCENES from './scenes/scenes';
import {worldInitialState} from './worldState';
import {notebookInitialState} from './notebook/notebookState';

// ----------------------------------------------

const initial: IGameStateToRestore = {
  world: worldInitialState,
  inventory: inventoryInitialState,
  notebook: notebookInitialState,
};

// ----------------------------------------------

const newGame: IPartialGameStateToRestore = {
  world: {
    currentSceneId: SCENES.hazelWorkshopByHazel,
  },
};

// =====================================================================

export const STATE_SNAPSHOTS = {
  initial,
  newGame: merge({}, initial, newGame),
};
