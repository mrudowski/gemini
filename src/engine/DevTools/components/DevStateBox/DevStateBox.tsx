import React, {useState} from 'react';
import './styles/DevStateBox.scss';
import classNames from 'classnames';
import {IWorldState} from '../../../../game/worldState';
import {getWorldState, setWorldStateInDevTools} from '../../../World/worldSlice';
import {IDispatch, useTypedDispatch, useTypedSelector} from '../../../redux/store';
import {resetAllState} from '../../../redux/thunks';
import {StateKey} from '../components';
import {ISceneId} from '../../../scene/Scene/types';

interface IDevStateBox {}

const setState = ({e, dispatch, setStringEditorData, statePath, stateValue, stateType}) => {
  e.preventDefault();
  e.stopPropagation();
  let newStateValue;
  if (stateType === 'string') {
    setStringEditorData({statePath, stateValue});
    return;
  } else if (stateType === 'number') {
    newStateValue = e.type === 'contextmenu' ? stateValue - 1 : stateValue + 1;
  } else {
    newStateValue = !stateValue;
  }
  dispatch(
    setWorldStateInDevTools({
      statePath,
      stateValue: newStateValue,
    })
  );
};

const parseState = (
  stateObj: IWorldState,
  dispatch: IDispatch,
  setStringEditorData,
  nodeVisibility,
  toggleNodeVisibility,
  currentSceneId: ISceneId,
  statePath
) => {
  const nodes: any = [];
  let currentScene = false;

  Object.entries(stateObj).forEach(([key, value]) => {
    currentScene = currentSceneId === key;
    statePath.push(key);

    let styleClass = '';
    let stateType = '';
    let isInteractive = false;
    if (value === null) {
      styleClass = 'emptyParent';
      stateType = 'emptyParent';
    } else if (typeof value === 'object') {
      styleClass = classNames('parent', currentScene && 'currentScene', nodeVisibility[key] && 'parentVisible');
      stateType = 'parent';
    } else if (Array.isArray(value)) {
      styleClass = 'arrayElement';
      stateType = 'arrayElement';
    } else if (value === true) {
      styleClass = 'true';
      stateType = 'true';
      isInteractive = true;
    } else if (value === false) {
      styleClass = 'false';
      stateType = 'false';
      isInteractive = true;
    } else if (typeof value === 'string') {
      styleClass = 'string';
      stateType = 'string';
      isInteractive = true;
    } else {
      styleClass = 'number';
      stateType = 'number';
      isInteractive = true;
    }

    const scenePathForAction = [...statePath];

    const setStateMethod = e => {
      if (!isInteractive) return;
      setState({
        e,
        dispatch,
        setStringEditorData,
        statePath: scenePathForAction,
        stateValue: value,
        stateType,
      });
    };

    const toggleNodeMethod = e => {
      e.preventDefault();
      e.stopPropagation();
      toggleNodeVisibility(prevState => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    };

    nodes.push(
      <li
        key={key}
        className={styleClass}
        {...(isInteractive && {
          onClick: setStateMethod,
        })}
        {...(isInteractive &&
          stateType === 'number' && {
            onContextMenu: setStateMethod,
          })}
      >
        <StateKey keyName={key} stateType={stateType} onClick={toggleNodeMethod} expanded={nodeVisibility[key]} />
        {(stateType === 'string' || stateType === 'number') && <span> = {value}</span>}

        {(stateType === 'parent' || stateType === 'arrayElement') &&
          parseState(
            value,
            dispatch,
            setStringEditorData,
            nodeVisibility,
            toggleNodeVisibility,
            currentSceneId,
            statePath
          )}
      </li>
    );
    statePath.pop();
  });

  return <ul key={`level-${statePath.length}-${statePath[statePath.length - 1]}`}>{nodes}</ul>;
};

const buildStateList = (stateObj, dispatch, setStringEditorData, nodeVisibility, toggleNodeVisibility) => {
  const currentSceneId = stateObj.currentSceneId;

  const list = parseState(
    stateObj,
    dispatch,
    setStringEditorData,
    nodeVisibility,
    toggleNodeVisibility,
    currentSceneId,
    []
  );
  return list;
};

interface IStringEditorData {
  statePath: string[];
  stateValue: string;
}

interface StringEditorProps {
  data: IStringEditorData;
  setStringEditorData;
}

const StringEditor = ({data: {statePath, stateValue}, setStringEditorData}: StringEditorProps) => {
  const dispatch = useTypedDispatch();

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      const newStateValue = e.target.value.trim();
      if (newStateValue !== '') {
        dispatch(
          setWorldStateInDevTools({
            statePath,
            stateValue: newStateValue,
          })
        );
        setStringEditorData(null);
      }
    }
    if (e.key === 'Escape') {
      setStringEditorData(null);
    }
  };
  return (
    <div className="devPanel devStateInputContainer">
      <input className="devStateInput" defaultValue={stateValue} onKeyDown={onKeyDown} autoFocus={true} />
    </div>
  );
};

const DevStateBox: React.FC<IDevStateBox> = () => {
  const worldState = useTypedSelector(getWorldState);
  const dispatch = useTypedDispatch();
  const [stringEditorData, setStringEditorData] = useState<IStringEditorData | null>(null);
  const [nodeVisibility, toggleNodeVisibility] = useState({});

  const resetState = e => {
    e.preventDefault();
    dispatch(resetAllState());
  };

  return (
    <div className="devPanel devStateBox">
      <div className="devStateList">
        {buildStateList(worldState, dispatch, setStringEditorData, nodeVisibility, toggleNodeVisibility)}
      </div>
      <a href="#" onDoubleClick={resetState} onClick={e => e.preventDefault()}>
        reset (double click)
      </a>
      {stringEditorData && <StringEditor data={stringEditorData} setStringEditorData={setStringEditorData} />}
    </div>
  );
};

export default DevStateBox;
