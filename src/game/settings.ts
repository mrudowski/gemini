import ACTORS from './actors/actors';
import LANGS from './i18n/languages';
import SCENES from './scenes/scenes';
import {ISettings} from '../engine/settings/types';

const SETTINGS: ISettings = {
  DEVELOP_FROM_LAST_SCENE: false, // set to true when develop
  DEFAULT_ACTOR: ACTORS.hazel,
  PRIMARY_LANG: LANGS.en,
  FIRST_SCENE: SCENES.hazelWorkshopByHazel,
  INTRO_SCENE: SCENES.introduction,
  MAIN_SCENE: SCENES.mainMenu,
  SOUND: true,
  SAVE_GAME_NAME: 'geminiSave',
};

export default SETTINGS;
