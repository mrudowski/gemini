import {ISceneId} from '../scene/Scene/types';
import SETTINGS from '../../game/settings';

export const updateStats = (sceneId: ISceneId | 'gameCompleted') => {
  if (window.location.href.search(/localhost/) !== -1) return;
  if (sceneId === SETTINGS.INTRO_SCENE || sceneId === SETTINGS.MAIN_SCENE) return;
  if (!window['gtag']) return;
  window['gtag']('event', 'scene', {sceneId});

  if (window['kongregate'] && sceneId === 'gameCompleted') {
    window['kongregate'].stats.submit('complete', 1);
  }
};
