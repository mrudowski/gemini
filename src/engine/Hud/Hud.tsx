import React from 'react';
import {AnimatePresence} from 'framer-motion';
import {useTypedSelector} from '../redux/store';
import HudButtonSwitch from './components/HudButtonSwitch/HudButtonSwitch';
import HudButtonShowPois from './components/HudButtonShowPois/HudButtonShowPois';
import HudButtonInventory from './components/HudButtonInventory/HudButtonInventory';
import HudButtonInGameMenu from './components/HudButtonInGameMenu/HudButtonInGameMenu';
import {
  getIsElmHazelSwitchTriggerVisible,
  getIsHerbariumTriggerVisible,
  getIsInGameMenuTriggerVisible,
  getIsINotebookTriggerVisible,
  getIsInventoryTriggerVisible,
  getIsShowPoisTriggerVisible,
} from './hudSlice';
import HudButtonNotebook from './components/HudButtonNotebook/HudButtonNotebook';
import HudButtonHerbarium from './components/HudButtonHerbarium/HudButtonHerbarium';

interface IHud {}

const Hud: React.FC<IHud> = () => {
  const inGameMenuTriggerVisible = useTypedSelector(getIsInGameMenuTriggerVisible);
  const showPoisTriggerVisible = useTypedSelector(getIsShowPoisTriggerVisible);
  const inventoryTriggerVisible = useTypedSelector(getIsInventoryTriggerVisible);
  const notebookTriggerVisible = useTypedSelector(getIsINotebookTriggerVisible);
  const herbariumTriggerVisible = useTypedSelector(getIsHerbariumTriggerVisible);
  const elmHazelSwitchTriggerVisible = useTypedSelector(getIsElmHazelSwitchTriggerVisible);

  // console.log('%c [mr] showInGameMenu', 'background-color:Gold; color: black', showInGameMenu);

  return (
    <AnimatePresence>
      {inGameMenuTriggerVisible && <HudButtonInGameMenu key="HudButtonInGameMenu" />}
      {elmHazelSwitchTriggerVisible && <HudButtonSwitch key="HudButtonSwitch" />}
      {showPoisTriggerVisible && <HudButtonShowPois key="HudButtonShowPois" />}
      {inventoryTriggerVisible && <HudButtonInventory key="HudButtonInventory" />}
      {notebookTriggerVisible && <HudButtonNotebook key="HudButtonNotebook" />}
      {herbariumTriggerVisible && <HudButtonHerbarium key="HudButtonHerbarium" />}
    </AnimatePresence>
  );
};

export default Hud;
