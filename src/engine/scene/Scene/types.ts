import SCENES from '../../../game/scenes/scenes';
import {IAction} from '../../actions/types';

export type ISceneId = keyof typeof SCENES;

export interface IScriptMetaWrapper {
  when?: boolean;
  skipToActionOnClick?: string;
  script: IAction[];
}
