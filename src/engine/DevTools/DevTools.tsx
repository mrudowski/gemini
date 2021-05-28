import React, {useEffect, useState} from 'react';
import './styles/DevTools.scss';

interface IDevTools {
}

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
        <select></select>
      </div>
    </div>
  );
};

export default DevTools;
