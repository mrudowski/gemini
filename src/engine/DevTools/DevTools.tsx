import React, {useEffect, useState} from 'react';
import './styles/DevTools.scss';
import DevLocationBox from './components/DevLocationBox/DevLocationBox';
import DevStateBox from './components/DevStateBox/DevStateBox';

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

  return (
    <div className="DevTools">
      <div className="devPanel devToolBox">
        <a href="#" onClick={togglePoi}>toggle poi</a>
        {/*<a href="#" id="toolHiddenPoi">toggle hidden poi</a>*/}
        {/*<a href="#" id="toolHotspots">toggle hotspots</a>*/}
      </div>
      <DevStateBox />
      <DevLocationBox />
    </div>
  );
};

export default DevTools;
