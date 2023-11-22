import React from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import HudButton from '../HudButton/HudButton';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import './styles/HudButtonShowPoisStyle.scss';
import {showPois} from '../../../redux/tempSlice';
import {getIsInGameMenuVisible} from '../../../ui/inGameMenu/inGameMenuSlice';
import {getIsInventoryVisible} from '../../../Inventory/inventoryWidgetSlice';
import {getIsGemLockOn} from '../../../redux/tempSliceSelectors';

interface IHudButtonShowPoi {}

const HudButtonShowPois: React.FC<IHudButtonShowPoi> = () => {
  const dispatch = useTypedDispatch();
  const isInGameMenuVisible = useTypedSelector(getIsInGameMenuVisible);
  const isInventoryVisible = useTypedSelector(getIsInventoryVisible);
  const gemLockOn = useTypedSelector(getIsGemLockOn);

  const showPoisAction = (e: any) => {
    dispatch(showPois());
    e.preventDefault();
  };

  const hotKeysEnabled = {
    // better then enabled because it preventDefault browser behaviour (thanks to
    // filterPreventDefault - prevent default browser behavior if the filter function
    // returns false. (Default: true)
    // enableOnTags: ['INPUT'],
    // filter: () => !isInGameMenuVisible && !isInventoryVisible

    // 07.03.2022 update: unfortunately above solution blocks all input (saveGameTitle)
    // so we are here again (and move blocking space higher)
    enabled: !isInGameMenuVisible && !isInventoryVisible && !gemLockOn,
  };

  useHotkeys('space, h', showPoisAction, hotKeysEnabled);

  return <HudButton className="hudButton--showPois" onClick={showPoisAction} />;
};

export default HudButtonShowPois;
