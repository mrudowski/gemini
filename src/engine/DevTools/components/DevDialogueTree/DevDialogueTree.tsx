import React from 'react';
import './styles/DevDialogueTree.scss';
import {useSelector} from 'react-redux';
import {getWorldState} from '../../../redux/worldSlice';
import {getCurrentActionIndex, getCurrentScript} from '../../../scriptPlayer/scriptPlayerSlice';
import {ACTIONS_NAMES} from '../../../actions';
import {IWaitAction} from '../../../scriptPlayer/waitActionSlice';
import {ITalkAction} from '../../../scriptPlayer/talkActionSlice';
import SETTINGS from '../../../../game/settings';

interface IDevDialogueTree {
}

const DevDialogueTree: React.FC<IDevDialogueTree> = () => {

  const worldState = useSelector(getWorldState);
  const currentScript = useSelector(getCurrentScript);
  const currentActionIndex = useSelector(getCurrentActionIndex);

  console.log('%c [mr] currentScript', 'background-color:Gold; color: black', currentScript);
  console.log('%c [mr] worldState', 'background-color:Gold; color: black', worldState);

  return (
    <div className="devPanel devDialogueTree">
      {currentScript && currentScript.map((action, index) => {
        return (
          <div key={index}>
            {currentActionIndex === index && '> '}
            {action.actionName}
            {action.actionName === ACTIONS_NAMES.TALK && ` ${(action as ITalkAction).payload.actorName || SETTINGS.DEFAULT_ACTOR}`}
            {action.actionName === ACTIONS_NAMES.WAIT && ` ${(action as IWaitAction).payload.duration || '1'} sec`}
            {action.when === false && ' (disabled)'}
          </div>
        );
      })}

    </div>
  );
};

export default DevDialogueTree;
