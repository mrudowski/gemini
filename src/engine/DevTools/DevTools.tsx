import React, {useEffect} from 'react';
import './styles/DevTools.scss';
import DevLocationBox from './components/DevLocationBox/DevLocationBox';
import DevStateBox from './components/DevStateBox/DevStateBox';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {
  getIsDebugMode,
  getIsShowHotspotActive,
  getIsShowPoiActive,
  setDebugMode, toggleHotspot,
  togglePoi
} from './devToolsSlice';
import DevDialogueTree from './components/DevDialogueTree/DevDialogueTree';

interface IDevTools {
}

const DevTools: React.FC<IDevTools> = () => {

  const isDebugMode = useTypedSelector(getIsDebugMode);
  const isShowPoiActive = useTypedSelector(getIsShowPoiActive);
  const isShowHotspotActive = useTypedSelector(getIsShowHotspotActive);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const isDebugModeEnabled = (window.location.href).search(/\?debugMode=true/) > -1;
    dispatch(setDebugMode(isDebugModeEnabled));
  }, [dispatch]);

  if (!isDebugMode) return null;

  const togglePoiCallback = e => {
    dispatch(togglePoi());
    e.preventDefault();
  };

  const toggleHotspotCallback = e => {
    dispatch(toggleHotspot());
    e.preventDefault();
  };

  return (
    <div className="DevTools">
      <div className="devPanel devToolBox">
        <a href="#" onClick={togglePoiCallback}>[{isShowPoiActive ? '+' : '-'}] show pois</a>
        {/*<a href="#" id="toolHiddenPoi">toggle hidden poi</a>*/}
        <a href="#" onClick={toggleHotspotCallback}>[{isShowHotspotActive ? '+' : '-'}] show hotspots</a>
      </div>
      <DevDialogueTree />
      <DevStateBox />
      <DevLocationBox />
    </div>
  );
};

export default DevTools;
