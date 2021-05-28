import React, {useEffect, useState} from 'react';
import './styles/DevTools.scss';
import {IWorldState, worldInitialState} from '../../sampleGame01/worldState';

interface IDevTools {
}

const buildLocationList = (scenes: IWorldState['scenes']) => Object.keys(scenes).map((sceneId) => (
  <option key={sceneId} value={sceneId}>{sceneId}</option>
));

const DevTools: React.FC<IDevTools> = () => {

  const [isDebugMode, setIsDebugMode] = useState(false);

  useEffect(() => {
    const isDebugModeEnabled = (window.location.href).search(/\?debugMode=true/) > -1;
    setIsDebugMode(isDebugModeEnabled);
  }, []);

  if (!isDebugMode) return null;

  const togglePoi = e => {
    e.preventDefault();
  };

  const resetState = e => {
    e.preventDefault();
  };

  const gotoScene = e => {
    console.log('%c [mr] gotoScene', 'background-color:Gold; color: black', e.value);
    //gem.world.gotoScene($(this).val());
  };

  return (
    <div className="DevTools">
      <div className="devPanel devToolBox">
        <a href="#" onClick={togglePoi}>toggle poi</a>
        {/*<a href="#" id="toolHiddenPoi">toggle hidden poi</a>*/}
        {/*<a href="#" id="toolHotspots">toggle hotspots</a>*/}
      </div>
      <div className="devPanel devInfoBox">
        <div className="devStateBox"></div>
        <a href="#" onClick={resetState}>reset</a>
      </div>
      <div className="devPanel devLocationBox">
        <select onChange={gotoScene}>
          {buildLocationList(worldInitialState.scenes)}
        </select>
      </div>
    </div>
  );
};

export default DevTools;
