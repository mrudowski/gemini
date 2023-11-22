import React, {FC} from 'react';
import './styles/DevDialogueTree.scss';
import {IWaitActionReturnType} from '../../../actions/wait/waitActionSlice';
import {ITalkAction, ITalkOptionsAction} from '../../../actions/talk/talkActionSlice';
import useGetActorNameToDisplay from '../../../Dialogue/hooks/useGetActorName';
import {ACTIONS_NAMES} from '../../../actions/actionsNames';
import {
  getCurrentPoiId,
  getCurrentSceneId,
  getIsGemLockOn,
  getIsSceneReadyAndActive,
  getNextSceneId,
} from '../../../redux/tempSliceSelectors';
import {ITalkOption} from '../../../actions/talk/talk';
import {
  getCurrentActionIndex,
  getCurrentScript,
  getCurrentScriptPoiId,
  getCurrentScriptSceneId,
} from '../../../scriptPlayer/scriptPlayerSliceSelectors';
import {useTypedSelector} from '../../../redux/store';

interface IDevDialogueTree {}

let indent = 0;

const DevDialogueTree: React.FC<IDevDialogueTree> = () => {
  //const worldState = useSelector(getWorldState);
  const currentScript = useTypedSelector(getCurrentScript);
  const currentActionIndex = useTypedSelector(getCurrentActionIndex);
  const currentPoiId = useTypedSelector(getCurrentPoiId);
  const currentSceneId = useTypedSelector(getCurrentSceneId);
  const nextSceneId = useTypedSelector(getNextSceneId);
  const sceneReadyAndActive = useTypedSelector(state => getIsSceneReadyAndActive(state, currentSceneId));
  const isGemLockOn = useTypedSelector(getIsGemLockOn);
  const currentScriptPoiId = useTypedSelector(getCurrentScriptPoiId);
  const currentScriptSceneId = useTypedSelector(getCurrentScriptSceneId);

  // console.log('%c [mr] currentScript', 'background-color:Gold; color: black', currentScript);

  // TODO get actor name from hook

  // TODO get options ids from talk options
  // display it as bullets and  indented

  let options: ITalkOption[] = [];

  return (
    <div className="devPanel devDialogueTree">
      <div>
        poiId: {currentPoiId}
        <br />
        sceneId: {currentSceneId}
        <br />
        nextSceneId: {nextSceneId}
        <br />
        sceneReadyAndActive: {sceneReadyAndActive ? 'TRUE' : 'FALSE'}
        <br />
        isGemLockOn: {isGemLockOn ? 'TRUE' : 'FALSE'}
        <hr />
      </div>
      <div>
        from script
        <br />
        poi: {currentScriptPoiId}
        <br />
        scene: {currentScriptSceneId}
        <hr />
      </div>
      <div className="devScrollContainer">
        {currentScript &&
          currentScript.map((action, index) => {
            if (index === 0) {
              indent = 0;
            }
            if (action.actionName === ACTIONS_NAMES.TALK_OPTIONS) {
              options = (action as ITalkOptionsAction).payload.options;
            }
            if (
              action.actionName !== ACTIONS_NAMES.TALK_OPTIONS &&
              action.id &&
              options.some(option => action.id === option.next || option.id)
            ) {
              indent = 1;
            }
            // if (currentActionIndex === index) {
            //   // [scriptPlayer] playAction
            //   console.log('%c [mr]', 'background-color:Gold; color: black', action);
            // }

            const hasActionIdAndNotTalkOptions = action.actionName !== ACTIONS_NAMES.TALK_OPTIONS && action.id;

            // console.log('%c [mr]', 'background-color:Gold; color: black', currentScript);
            return (
              <div key={index} className={`devDialogueTree__item indent-${indent}`}>
                {currentActionIndex === index && '> '}
                {hasActionIdAndNotTalkOptions && (
                  <>
                    <span className="devDialogueTree__item__bullet" />
                    {action.id}:
                  </>
                )}
                {action.actionName} {action.actionName === ACTIONS_NAMES.TALK && <ActorName action={action} />}
                {action.actionName === ACTIONS_NAMES.SET_SCENE_STATE && ` ${JSON.stringify(action.payload)}`}
                {action.actionName === ACTIONS_NAMES.WAIT &&
                  ` ${(action as IWaitActionReturnType).payload.duration || '1'} sec`}
                {action.when === false && ' (disabled)'}
              </div>
            );
          })}
      </div>
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
