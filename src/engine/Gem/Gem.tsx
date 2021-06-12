import React, {Suspense, useMemo} from 'react';
import classNames from 'classnames';
import './styles/GemStyle.scss';
import {useTypedSelector} from '../redux/store';
import {getCurrentSceneId} from '../redux/gemSlice';
import VerbMenu from '../VerbMenu/VerbMenu';
import Dialogue from '../Dialogue/Dialogue';
import DevTools from '../DevTools/DevTools';
import Wait from '../GemLock/GemLock';
import {getIsShowHotspotActive, getIsShowPoiActive} from '../DevTools/devToolsSlice';
import SoundDJ from './SoundDJ';
// TODO works?
// TODO it should be dynamically!

const Gem = () => {
  const currentSceneId = useTypedSelector(getCurrentSceneId);
  const isShowPoiActive = useTypedSelector(getIsShowPoiActive);
  const isShowHotspotActive = useTypedSelector(getIsShowHotspotActive);

  console.log('%c [Gem] render', 'color: CRIMSON');

  const classes = classNames(
    'Gem',
    isShowPoiActive && 'Gem--debug--showPoi',
    isShowHotspotActive && 'Gem--debug--showHotspot',
  );

  // TODO move it deeper


  const CurrentScene = useMemo(() => {
    return React.lazy(() => import(`../../sampleGame01/scenes/${currentSceneId}/Scene`));
  }, [currentSceneId]);

  return (
    <div className={classes}>
      <DevTools/>
      <div className="App__viewport">
        <SoundDJ />
        <Suspense fallback={<div>loading...</div>}>
          <CurrentScene />
        </Suspense>
        <Dialogue />
        <VerbMenu />
        <Wait />
      </div>
    </div>
  );
};

export default Gem;
