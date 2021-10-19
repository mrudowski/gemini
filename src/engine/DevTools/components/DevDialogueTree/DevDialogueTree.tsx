import React, {FC} from 'react';
import './styles/DevDialogueTree.scss';
import {useSelector} from 'react-redux';
import {getWorldState} from '../../../redux/worldSlice';
import {getCurrentActionIndex, getCurrentScript} from '../../../scriptPlayer/scriptPlayerSlice';
import {ACTIONS_NAMES, ITalkOption} from '../../../actions';
import {IWaitAction} from '../../../scriptPlayer/waitActionSlice';
import {ITalkAction, ITalkOptionsAction} from '../../../scriptPlayer/talkActionSlice';
import useGetActorNameToDisplay from '../../../Dialogue/hooks/useGetActorName';

interface IDevDialogueTree {}

const DevDialogueTree: React.FC<IDevDialogueTree> = () => {
  const worldState = useSelector(getWorldState);
  const currentScript = useSelector(getCurrentScript);
  const currentActionIndex = useSelector(getCurrentActionIndex);

  console.log('%c [mr] currentScript', 'background-color:Gold; color: black', currentScript);
  console.log('%c [mr] worldState', 'background-color:Gold; color: black', worldState);

  // TODO get actor name from hook

  // TODO get options ids from talk options
  // display it as bullets and  indented

  let options: ITalkOption[] = [];

  return (
    <div className="devPanel devDialogueTree">
      {currentScript &&
        currentScript.map((action, index) => {
          if (action.actionName === ACTIONS_NAMES.TALK_OPTIONS) {
            options = (action as ITalkOptionsAction).payload.options;
          }
          let indent = 0;
          if (action.id && options.some(option => action.id === option.next || option.id)) {
            indent = 1;
          }
          return (
            <div key={index} className={`indent-${indent}`}>
              {currentActionIndex === index && '> '}
              {action.actionName !== ACTIONS_NAMES.TALK_OPTIONS && action.id && ` ${action.id}: `}
              {action.actionName} {action.actionName === ACTIONS_NAMES.TALK && <ActorName action={action} />}
              {action.actionName === ACTIONS_NAMES.WAIT && ` ${(action as IWaitAction).payload.duration || '1'} sec`}
              {action.when === false && ' (disabled)'}
            </div>
          );
        })}
    </div>
  );
};

export default DevDialogueTree;

interface IActorName {
  action: ITalkAction;
}

const ActorName: FC<IActorName> = ({action}) => {
  const actorNameToDisplay = useGetActorNameToDisplay({
    actorId: action.payload.actor,
    actorName: action.payload.actorName,
  });
  return <>{actorNameToDisplay}</>;
};
