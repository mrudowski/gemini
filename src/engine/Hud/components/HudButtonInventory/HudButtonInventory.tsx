import React from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import './styles/HudButtonInventory.scss';
import HudButton from '../HudButton/HudButton';
import {hideInventory, toggleInventory} from '../../../Inventory/inventoryWidgetSlice';
import {getInventoryItems} from '../../../Inventory/inventorySlice';
import useSeekAttentionWhen from '../../../commons/hooks/useSeekAttentionWhen';
import {getIsInventoryTriggerActive} from '../../hudSlice';

interface IHudButtonInventory {}

const HudButtonInventory: React.FC<IHudButtonInventory> = () => {
  const dispatch = useTypedDispatch();
  const inventoryItems = useTypedSelector(getInventoryItems);
  const isInventoryTriggerActive = useTypedSelector(getIsInventoryTriggerActive);

  const seekAttention = useSeekAttentionWhen(inventoryItems);

  const showInventoryAction = (e: any) => {
    dispatch(toggleInventory());
    e.preventDefault();
  };

  const closeInventoryAction = (e: any) => {
    dispatch(hideInventory());
    e.preventDefault();
  };

  const hotKeysEnabled = {
    enabled: isInventoryTriggerActive,
  };

  useHotkeys('esc', closeInventoryAction, hotKeysEnabled);
  useHotkeys('i', showInventoryAction, hotKeysEnabled);

  return <HudButton className="hudButton--inventory" onClick={showInventoryAction} seekAttention={seekAttention} />;
};

export default HudButtonInventory;
