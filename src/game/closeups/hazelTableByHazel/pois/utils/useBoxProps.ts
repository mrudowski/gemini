import {IHazelTableByHazelSceneState} from '../../state';
import {useSceneState} from '../../../../../engine/stateHooks/stateHooks';
import CLOSEUPS from '../../../closeups';
import useBoxVerbs from './useBoxVerbs';

const useBoxProps = (boxName: keyof IHazelTableByHazelSceneState, images: string[]) => {
  const sceneState = useSceneState(CLOSEUPS.hazelTableByHazel);
  const boxContent = sceneState[boxName] as number;
  const verbs = useBoxVerbs(boxName);
  const imagesToShow = Array.from({length: boxContent}, (_, i) => {
    return images[i];
  });

  return {
    imagesToPreload: images,
    imagesToShow,
    verbs,
  };
};

export default useBoxProps;
