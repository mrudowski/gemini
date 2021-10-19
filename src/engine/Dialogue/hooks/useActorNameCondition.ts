import {useTypedSelector} from '../../redux/store';
import {getActorState, getSceneState} from '../../redux/worldSlice';
import SCENES from '../../../game/scenes';
import {useTranslation} from '../../translation';
import ACTORS, {IActorId} from '../../../game/actors';
import {ITeaShopSceneState} from '../../../game/scenes/teaShop/state';

const useActorNameCondition = (actor: IActorId) => {
  const t = useTranslation();
  const teaShopSceneState = useTypedSelector(getSceneState(SCENES.teaShop)) as ITeaShopSceneState;
  const actorState = useTypedSelector(getActorState(actor));

  switch (actor) {
    case ACTORS.salammon: {
      if (teaShopSceneState.tableDishesExamineCounter % 2) {
        return t.actors.salammonUnpleasant;
      }
      if (actorState.salammon) return t.actors.salammon;
      return t.actors.unknown;
    }
  }

  return t.actors[actor];
};

export default useActorNameCondition;
