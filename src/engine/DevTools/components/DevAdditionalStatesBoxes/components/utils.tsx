import React, {ReactNode} from 'react';
import {IDispatch} from '../../../../redux/store';
import {addItems, IInventoryItemId, removeItems} from '../../../../Inventory/inventorySlice';
import {addNotes, INotebookNoteId, removeNotes} from '../../../../notebook/notebookSlice';
import {saveCurrentGame} from '../../../../Gem/gemSlice';

/**
 * commons for inventory and notebook state
 */

type IItemsInInventoryState = Record<IInventoryItemId, boolean> | Record<INotebookNoteId, boolean>;
type IStateType = 'inventory' | 'notebook';

const setState = ({
  e,
  dispatch,
  stateType,
  itemId,
  isItemInInventory,
}: {
  e;
  dispatch: IDispatch;
  stateType: IStateType;
  itemId: IInventoryItemId & INotebookNoteId;
  isItemInInventory: boolean;
}) => {
  e.preventDefault();
  if (isItemInInventory) {
    const removeMethod = stateType === 'inventory' ? removeItems : removeNotes;
    dispatch(removeMethod([itemId]));
    dispatch(saveCurrentGame());
  } else {
    const addMethod = stateType === 'inventory' ? addItems : addNotes;
    dispatch(addMethod([itemId]));
    dispatch(saveCurrentGame());
  }
};

export const parseState = (stateType: IStateType, itemsState: IItemsInInventoryState, dispatch: IDispatch) => {
  const nodes: ReactNode[] = [];
  Object.entries(itemsState).forEach(([itemId, isItemInInventory]) => {
    const styleClass = isItemInInventory ? 'true' : 'false';

    const setStateMethod = e => {
      setState({
        e,
        dispatch,
        stateType,
        itemId: itemId as IInventoryItemId & INotebookNoteId,
        isItemInInventory,
      });
    };

    nodes.push(
      <li key={itemId} className={styleClass} onClick={setStateMethod}>
        <span>{itemId}</span>
      </li>
    );
  });

  return <ul>{nodes}</ul>;
};
