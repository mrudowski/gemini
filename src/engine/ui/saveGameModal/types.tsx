import {ISceneId} from '../../scene/Scene/types';
import {ISaveGameSlotId} from '../../saveGameStorage/types';

export type ISaveGameTitleModalOnSubmit = (slotId: ISaveGameSlotId, title: string) => void;

export interface ISaveGameTitleModalData {
  slotId: ISaveGameSlotId;
  title: string;
  onSubmit: ISaveGameTitleModalOnSubmit;
}

export interface ISaveGame {
  id: ISaveGameSlotId;
  title: string;
  date: string;
  sceneId: ISceneId | '';
}
