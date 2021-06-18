import {useTypedSelector} from '../engine/redux/store';
import {getActorState, getSceneState} from '../engine/redux/worldSlice';
import SCENES from './scenes';
import T from '../engine/translation';
import ACTORS, {IActorId} from './actors';

const t = T();

const useActorNameCondition = (actor: IActorId) => {
  const teaShopSceneState = useTypedSelector(getSceneState(SCENES.teaShop));
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
