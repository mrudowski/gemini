import React, {Suspense} from 'react';
import classNames from 'classnames';
import './styles/GemStyle.scss';
import {useTypedSelector} from '../redux/store';
import VerbMenu from '../VerbMenu/VerbMenu';
import Dialogue from '../Dialogue/Dialogue';
import DevTools from '../DevTools/DevTools';
import Wait from '../GemLock/GemLock';
import {getIsShowHotspotActive, getIsShowPoiActive} from '../DevTools/devToolsSlice';
import SoundDJ from './SoundDJ';
import PreloadUI from '../PreloadUI/PreloadUI';
import SceneViewer from '../SceneViewer/SceneViewer';
import {useTranslationLoader} from '../translation';
import Hud from '../hud/Hud';

const SuspenseTest1 = ({children}) => {
  return <div style={{color: 'white'}}>{children}</div>;
};

const Gem = () => {
  useTranslationLoader();
  const isShowPoiActive = useTypedSelector(getIsShowPoiActive);
  const isShowHotspotActive = useTypedSelector(getIsShowHotspotActive);

  console.log('%c [Gem] render', 'color: CRIMSON');

  const classes = classNames(
    'Gem',
    isShowPoiActive && 'Gem--debug--showPoi',
    isShowHotspotActive && 'Gem--debug--showHotspot'
  );

  return (
    <div className={classes}>
      <DevTools />
      <div className="Gem__viewport">
        <SoundDJ />
        <Suspense fallback={<SuspenseTest1>loading all...</SuspenseTest1>}>
          <PreloadUI />
          <SceneViewer />
          <Hud />
          <Suspense fallback={<div>loading dialogue...</div>}>
            <Dialogue />
          </Suspense>
          <VerbMenu />
          <Wait />
        </Suspense>
      </div>
    </div>
  );
};

export default Gem;
