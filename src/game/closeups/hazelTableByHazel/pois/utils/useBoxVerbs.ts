import CUSTOM_ACTIONS from '../../../../customActions';
import {IHazelTableByHazelSceneState} from '../../state';
import {useTranslation} from '../../../../../engine/translation';
import {useSceneState} from '../../../../../engine/stateHooks/stateHooks';
import CLOSEUPS from '../../../closeups';
import ACTIONS from '../../../../../engine/actions/actions';

const useBoxVerbs = (boxName: keyof IHazelTableByHazelSceneState) => {
  const t = useTranslation();
  const sceneState = useSceneState(CLOSEUPS.hazelTableByHazel);
  const boxContent = sceneState[boxName] as number;

  return [
    {
      name: t.verbs.examine,
      script: [
        ACTIONS.talk({
          text: t.scenes.hazelTableByHazel.boxes.examine + ' ' + t.scenes.hazelTableByHazel.boxes[boxName],
        }),
      ],
    },
    {
      name: t.verbs.addItem,
      when: boxContent < 5,
      script: [
        ACTIONS.setSceneState({
          scene: CLOSEUPS.hazelTableByHazel,
          state: {[boxName]: boxContent + 1},
        }),
        ACTIONS.custom({
          action: CUSTOM_ACTIONS.checkHazelEquationByHazel,
        }),
      ],
    },
    {
      name: t.verbs.removeItem,
      when: boxContent > 0,
      script: [
        ACTIONS.setSceneState({
          scene: CLOSEUPS.hazelTableByHazel,
          state: {[boxName]: boxContent - 1},
        }),
        ACTIONS.custom({
          action: CUSTOM_ACTIONS.checkHazelEquationByHazel,
        }),
      ],
    },
  ];
};

export default useBoxVerbs;
