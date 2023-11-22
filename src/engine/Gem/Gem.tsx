import React, {useEffect} from 'react';
import classNames from 'classnames';
import './styles/GemStyle.scss';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import VerbMenu from '../VerbMenu/VerbMenu';
import Dialogue from '../Dialogue/Dialogue';
import DevTools from '../DevTools/DevTools';
import GemLock from '../GemLock/GemLock';
import {getIsShowHotspotActive, getIsShowPoiActive} from '../DevTools/devToolsSlice';
import SoundDJ from '../sound/SoundDJ';
import PreloadUI from '../PreloadUI/PreloadUI';
import SceneViewer from '../scene/SceneViewer/SceneViewer';
import {useTranslationLoader} from '../translation';
import Hud from '../Hud/Hud';
import CloseupViewer from '../closeup/CloseupViewer/CloseupViewer';
import Inventory from '../Inventory/Inventory';
import InGameMenu from '../ui/inGameMenu/InGameMenu';
import usePreventDefaultSpaceKey from './hooks/usePreventDefaultSpaceKey';
import GemSuspense from '../commons/components/GemSuspense/GemSuspense';
import ShowText from '../ShowText/ShowText';
import SETTINGS from '../../game/settings';
import {developFromLastSceneThunk} from '../redux/tempSlice';
import GemSkippable from '../GemSkippable/GemSkippable';
import ShowImage from '../ShowImage/ShowImage';
import Notebook from '../notebook/Notebook';
import HerbariumWidget from '../herbarium/components/HerbariumWidget/HerbariumWidget';
import GemViewport from './GemViewport';
import SwitchSceneLightEffect from '../switchLightEffect/SwitchSceneLightEffect';
import SwitchAppLightEffect from '../switchLightEffect/SwitchAppLightEffect';
import Credits from '../credits/components/Credits/Credits';
import PreloadPortraits from '../PreloadPortraits/PreloadPortraits';

const Gem = () => {
  const dispatch = useTypedDispatch();
  useTranslationLoader();
  const isShowPoiActive = useTypedSelector(getIsShowPoiActive);
  const isShowHotspotActive = useTypedSelector(getIsShowHotspotActive);

  console.log('%c [Gem] render', 'background-color:black; color: CRIMSON');

  const classes = classNames(
    'Gem',
    isShowPoiActive && 'Gem--debug--showPoi',
    isShowHotspotActive && 'Gem--debug--showHotspot'
  );

  useEffect(() => {
    if (SETTINGS.DEVELOP_FROM_LAST_SCENE) {
      console.log('%c [Gem] DEVELOP_FROM_LAST_SCENE', 'background-color:black; color: CRIMSON');
      dispatch(developFromLastSceneThunk());
    }
  }, [dispatch]);

  usePreventDefaultSpaceKey();

  return (
    <div className={classes}>
      <DevTools />
      <GemViewport>
        <SoundDJ />
        <GemSuspense kind="main">
          <PreloadUI />
          <PreloadPortraits />
          <SceneViewer />
          <SwitchSceneLightEffect />
          <CloseupViewer />
          <Hud />
          <ShowImage />
          <Inventory />
          <Notebook />
          <HerbariumWidget />
          <Credits />
          <GemSuspense kind="ui">
            <Dialogue />
          </GemSuspense>
          <ShowText />
          <VerbMenu />
          <InGameMenu />
          <SwitchAppLightEffect />
          <GemLock />
          <GemSkippable />
        </GemSuspense>
      </GemViewport>
    </div>
  );
};

export default Gem;
