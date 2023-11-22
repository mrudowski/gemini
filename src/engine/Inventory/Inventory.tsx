import React, {useCallback, useEffect} from 'react';
import {batch} from 'react-redux';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import InventoryItems from './components/InventoryItems/InventoryItems';
import {getIsInventoryVisible, hideInventory, setInventoryAsReady} from './inventoryWidgetSlice';
import UIWidget from '../commons/components/UIWidget/UIWidget';
import {turnOffGemLock, turnOnGemLock} from '../redux/tempSlice';
import './styles/Inventory.scss';

interface IInventory {}

const Inventory: React.FC<IInventory> = () => {
  const dispatch = useTypedDispatch();
  const isInventoryVisible = useTypedSelector(getIsInventoryVisible);

  const onOpenComplete = useCallback(() => {
    // dispatch(endAction());
    batch(() => {
      dispatch(setInventoryAsReady(true));
      dispatch(turnOffGemLock());
    });
  }, [dispatch]);

  const onCloseComplete = useCallback(() => {
    // dispatch(endAction());
  }, []);

  const onClose = useCallback(() => {
    dispatch(hideInventory());
  }, [dispatch]);

  useEffect(() => {
    if (isInventoryVisible) {
      dispatch(turnOnGemLock());
    }
  }, [isInventoryVisible, dispatch]);

  const showHerbsSlots = false;
  // const {cookingTalkStarted: showHerbsSlots} = useSceneState(SCENES.neesanGreen);

  return (
    <UIWidget
      className="UIWidget--Inventory"
      isOpen={isInventoryVisible}
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      onOpenComplete={onOpenComplete}
    >
      {showHerbsSlots && (
        <div className="InventoryHerbsSlots">
          <div></div>
        </div>
      )}
      <InventoryItems />
    </UIWidget>
  );
};

export default Inventory;
