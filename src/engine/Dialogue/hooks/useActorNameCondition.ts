import {useTranslation} from '../../translation';
import {IActorId} from '../types';

// TODO we leave it here for future use
const useActorNameCondition = (actor: IActorId) => {
  const t = useTranslation();
  // const teaShopSceneState = useTypedSelector(state => getSceneState(state, SCENES.teaShop)) as ITeaShopSceneState;
  // const actorState = useTypedSelector(state => getActorState(state, actor));

  // switch (actor) {
  // case ACTORS.salammon: {
  //   if (teaShopSceneState.tableDishesExamineCounter % 2) {
  //     return t.actors.salammonUnpleasant;
  //   }
  //   if (actorState.salammon) return t.actors.salammon;
  //   return t.actors.unknown;
  // }
  // }

  return t.actors[actor];
};

export default useActorNameCondition;
