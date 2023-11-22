import {IWorldState} from '../../game/worldState';
import {IInventoryState} from '../Inventory/inventorySlice';
import {INotebookState} from '../notebook/notebookSlice';

export interface IGameStateToRestore {
  world: IWorldState;
  inventory: IInventoryState;
  notebook: INotebookState;
}

// or DeepPartial
type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export interface IPartialGameStateToRestore {
  world?: RecursivePartial<IWorldState>;
  inventory?: IInventoryState;
  notebook?: INotebookState;
}
