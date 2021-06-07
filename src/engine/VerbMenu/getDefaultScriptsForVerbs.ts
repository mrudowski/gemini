// TODO To remove

// import VERBS from './verbs';
// import T from '../translation';
// import actions from '../actions';

// const capitalizedFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);


const getDefaultScriptForVerb = (verbName: string, sceneId: string, poiId: string) => {
  // switch (verbName) {
  //   case VERBS.EXAMINE:
  //   case VERBS.TAKE: {
  //     return [
  //       actions.talk({text: T().scenes[sceneId][poiId + capitalizedFirstLetter(verbName)]}),
  //     ];
  //   }
  //   default: {
  //     throw new Error('We do not know this `verb`: ' + verbName);
  //   }
  // }
};

export default getDefaultScriptForVerb;
