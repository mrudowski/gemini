import ACTIONS from '../../../../../engine/actions/actions';
import {useSceneState} from '../../../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../../../engine/translation';
import CLOSEUPS from '../../../closeups';
import CUSTOM_ACTIONS from '../../../../customActions';
import {IHazelTableByElmSceneState} from '../../state';

const useBoxVerbs = (boxName: keyof IHazelTableByElmSceneState) => {
  const t = useTranslation();
  const sceneState = useSceneState(CLOSEUPS.hazelTableByElm);
  const boxContent = sceneState[boxName] as number;

  return [
    {
      name: t.verbs.examine,
      script: [
        ACTIONS.talk({
          text: t.scenes.hazelTableByElm.boxes.examine,
        }),
      ],
    },
    {
      name: t.verbs.addItem,
      when: boxContent < 5,
      script: [
        ACTIONS.setSceneState({
          scene: CLOSEUPS.hazelTableByElm,
          state: {[boxName]: boxContent + 1},
        }),
        ACTIONS.custom({
          action: CUSTOM_ACTIONS.checkHazelEquationByElm,
        }),
      ],
    },
    {
      name: t.verbs.removeItem,
      when: boxContent > 0,
      script: [
        ACTIONS.setSceneState({
          scene: CLOSEUPS.hazelTableByElm,
          state: {[boxName]: boxContent - 1},
        }),
        ACTIONS.custom({
          action: CUSTOM_ACTIONS.checkHazelEquationByElm,
        }),
      ],
    },
  ];
};

export default useBoxVerbs;
