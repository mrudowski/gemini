import React from 'react';
import './styles/DevStateBox.scss';
import {useSelector} from 'react-redux';
import {IWorldState} from '../../../../game/worldState';
import {getWorldState, resetWorldState, setWorldState} from '../../../redux/worldSlice';
import {IDispatch, useTypedDispatch} from '../../../redux/store';

interface IDevStateBox {}

const StateKey = ({styleClass, keyName}) => {
  if (styleClass === 'arrayElement') {
    return <span>[{keyName}]</span>;
  }
  if (keyName === '0' && styleClass === 'parent') {
    return <span>object</span>;
  }
  return <span>{keyName}</span>;
};

const setState = ({e, dispatch, statePath, stateValue, stateType}) => {
  e.preventDefault();
  let newStateValue;
  if (stateType === 'number') {
    newStateValue = e.type === 'contextmenu' ? stateValue - 1 : stateValue + 1;
  } else {
    newStateValue = !stateValue;
  }
  dispatch(
    setWorldState({
      statePath,
      stateValue: newStateValue,
    })
  );
};

const parseState = (stateObj: IWorldState, dispatch: IDispatch, statePath) => {
  const nodes: any = [];
  Object.entries(stateObj).forEach(([key, value]) => {
    statePath.push(key);

    let styleClass = '';
    if (typeof value === 'object' && value !== null) {
      styleClass = 'parent';
    } else if (Array.isArray(value)) {
      styleClass = 'arrayElement';
    } else if (value === true) {
      styleClass = 'true';
    } else if (value === false) {
      styleClass = 'false';
    } else if (isNaN(value)) {
      styleClass = 'string';
    } else {
      styleClass = 'number';
    }

    const isInteractive = styleClass === 'number' || styleClass === 'true' || styleClass === 'false';

    const scenePathForAction = [...statePath];

    const setStateMethod = e => {
      if (!isInteractive) return;
      setState({
        e,
        dispatch,
        statePath: scenePathForAction,
        stateValue: value,
        stateType: styleClass,
      });
    };

    nodes.push(
      <li
        key={key}
        className={styleClass}
        {...(isInteractive && {
          onClick: setStateMethod,
        })}
        {...(isInteractive &&
          styleClass === 'number' && {
            onContextMenu: setStateMethod,
          })}
      >
        <StateKey keyName={key} styleClass={styleClass} />
        {(styleClass === 'string' || styleClass === 'number') && <span> = {value}</span>}
      </li>
    );

    if (styleClass === 'parent' || styleClass === 'arrayElement') {
      nodes.push(parseState(value, dispatch, statePath));
    }

    statePath.pop();
  });

  return <ul key={`level-${statePath.length}-${statePath[statePath.length - 1]}`}>{nodes}</ul>;
};

const buildStateList = (stateObj, dispatch) => {
  const list = parseState(stateObj, dispatch, []);
  return list;
};

const DevStateBox: React.FC<IDevStateBox> = () => {
  const worldState = useSelector(getWorldState);
  const dispatch = useTypedDispatch();

  const resetState = e => {
    e.preventDefault();
    dispatch(resetWorldState());
  };

  return (
    <div className="devPanel devStateBox">
      <div className="devStateList">{buildStateList(worldState, dispatch)}</div>
      <a href="#" onDoubleClick={resetState} onClick={e => e.preventDefault()}>
        reset (double click)
      </a>
    </div>
  );
};

export default DevStateBox;
