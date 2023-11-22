import React, {useEffect} from 'react';
import './styles/DevTools.scss';
import DevLocationBox from './components/DevLocationBox/DevLocationBox';
import DevStateBox from './components/DevStateBox/DevStateBox';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {
  getIsDebugMode,
  getIsShowHiddenPoiActive,
  getIsShowHotspotActive,
  getIsShowPoiActive,
  setDebugMode,
  toggleHiddenPoi,
  toggleHotspot,
  togglePoi,
} from './devToolsSlice';
import DevDialogueTree from './components/DevDialogueTree/DevDialogueTree';
import DevLangBox from './components/DevLangBox/DevLangBox';
import DevStateSnapshotBox from './components/DevStateSnapshotBox/DevStateSnapshotBox';
import DevAdditionalStatesBoxes from './components/DevAdditionalStatesBoxes/DevAdditionalStatesBoxes';

interface IDevTools {}

const DevTools: React.FC<IDevTools> = () => {
  const isDebugMode = useTypedSelector(getIsDebugMode);
  const isShowPoiActive = useTypedSelector(getIsShowPoiActive);
  const isShowHiddenPoiActive = useTypedSelector(getIsShowHiddenPoiActive);
  const isShowHotspotActive = useTypedSelector(getIsShowHotspotActive);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const isDebugModeEnabled = window.location.href.search(/\?debugMode=true/) > -1;
    dispatch(setDebugMode(isDebugModeEnabled));
  }, [dispatch]);

  if (!isDebugMode) return null;

  const toggleShowPoiCallback = e => {
    dispatch(togglePoi());
    e.preventDefault();
  };

  const toggleShowHiddenPoiCallback = e => {
    dispatch(toggleHiddenPoi());
    e.preventDefault();
  };

  const toggleShowHotspotCallback = e => {
    dispatch(toggleHotspot());
    e.preventDefault();
  };

  return (
    <div className="DevTools">
      <div className="devPanel devToolBox">
        <a href="#" onClick={toggleShowPoiCallback}>
          [{isShowPoiActive ? '+' : '-'}] show pois
        </a>
        <a href="#" onClick={toggleShowHiddenPoiCallback}>
          [{isShowHiddenPoiActive ? '+' : '-'}] show hidden poi
        </a>
        <a href="#" onClick={toggleShowHotspotCallback}>
          [{isShowHotspotActive ? '+' : '-'}] show hotspots
        </a>
      </div>
      <DevAdditionalStatesBoxes />
      <DevDialogueTree />
      <DevStateBox />
      <DevStateSnapshotBox />
      <DevLocationBox />
      <DevLangBox />
    </div>
  );
};

export default DevTools;
