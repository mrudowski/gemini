import React from 'react';
import './styles/DevStateBox.scss';
import {useSelector} from 'react-redux';
import {IWorldState} from '../../../../sampleGame01/worldState';
import {getWorldState} from '../../../redux/worldSlice';

interface IDevStateBox {
}

const StateKey = ({styleClass, keyName}) => {
  if (styleClass === 'arrayElement') {
    return <span>[{keyName}]</span>;
  }
  if (keyName === '0' && styleClass === 'parent') {
    return <span>object</span>;
  }
  return <span>{keyName}</span>;
};

const onClick = (e) => {
  e.preventDefault();
  console.log('%c [mr] TODO', 'background-color:Gold; color: black', 'click');
};

const onContextMenu = (e) => {
  e.preventDefault();
  console.log('%c [mr] TODO', 'background-color:Gold; color: black', 'right click');
};

const parseState = (stateObj: IWorldState, statePath) => {
  const nodes:any = [];
  Object.entries(stateObj).forEach(([key, value]) => {
    statePath.push(key);

    let styleClass = '';
    if (typeof value === 'object' && value !== null) {
      styleClass = 'parent';
    }
    else if (Array.isArray(value)) {
      styleClass = 'arrayElement';
    }
    else if (value === true) {
      styleClass = 'true';
    }
    else if (value === false) {
      styleClass = 'false';
    }
    else if (isNaN(value)) {
      styleClass = 'string';
    } else {
      styleClass = 'number';
    }

    nodes.push(
      <li className={styleClass} onClick={onClick} onContextMenu={onContextMenu}>
        <StateKey keyName={key} styleClass={styleClass} />
        {(styleClass === 'string' ||  styleClass === 'number') && (
          <span> = {value}</span>
        )}
      </li>
    );

    if (styleClass === 'parent' || styleClass === 'arrayElement') {
      nodes.push(parseState(value, statePath));
    }

    statePath.pop();
  });

  return (
    <ul>
      {nodes}
    </ul>
  );

};

const buildStateList = (stateObj) => {
  const list = parseState(stateObj,[]);
  return list;
};

const DevStateBox: React.FC<IDevStateBox> = () => {

  const worldState = useSelector(getWorldState);

  const resetState = e => {
    e.preventDefault();
  };


  return (
    <div className="devPanel devStateBox">
      <div className="devStateList">
        {buildStateList(worldState)}
      </div>
      <a href="#" onClick={resetState}>reset</a>
    </div>
  );
};

export default DevStateBox;
