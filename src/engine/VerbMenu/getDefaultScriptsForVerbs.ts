import VERBS from './verbs';
import T from '../translation';
import actions from '../actions';

const capitalizedFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);


const getDefaultScriptForVerb = (verbId: string, sceneId: string, poiId: string) => {
  switch (verbId) {
    case VERBS.examine: {
      return [
        actions.talk({text: T().scenes[sceneId][poiId + capitalizedFirstLetter(verbId)]}),
      ];
    }
    default: {
      throw new Error('We do not know this `verb`: ' + verbId);
    }
  }

};

export default getDefaultScriptForVerb;
