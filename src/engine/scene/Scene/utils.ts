import {IScriptMetaWrapper} from './types';

export const getFirstActiveScript = (scriptMetaWrapperArray: IScriptMetaWrapper[] | undefined) => {
  if (!scriptMetaWrapperArray) return undefined;
  return scriptMetaWrapperArray.find(scriptMetaWrapper => scriptMetaWrapper.when ?? true);
};
