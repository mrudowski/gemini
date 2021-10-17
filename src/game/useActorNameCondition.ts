import {useTypedSelector} from '../engine/redux/store';
import {getActorState, getSceneState} from '../engine/redux/worldSlice';
import SCENES from './scenes';
import {useTranslation} from '../engine/translation';
import ACTORS, {IActorId} from './actors';
import {ITeaShopSceneState} from './scenes/teaShop/state';

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
