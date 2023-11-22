import {IActorId} from '../Dialogue/types';
import {ILangId} from '../translation/types';
import {ISceneId} from '../scene/Scene/types';

export interface ISettings {
  DEVELOP_FROM_LAST_SCENE: boolean;
  DEFAULT_ACTOR: IActorId;
  PRIMARY_LANG: ILangId;
  FIRST_SCENE: ISceneId;
  INTRO_SCENE: ISceneId;
  MAIN_SCENE: ISceneId;
  SOUND: boolean;
  SAVE_GAME_NAME: string;
}
