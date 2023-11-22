import {IActionPayload, ISpecifiedAction} from '../types';
import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';
import {INotebookNoteId} from '../../notebook/notebookSlice';

export interface IAddNotesActionPayload extends IActionPayload {
  notes: INotebookNoteId[];
}

/**
 * Add many notes to the notebook
 *
 * If you add a note that is already in notebook the game engine will just skip it
 */
export const addNotes = (payload?: IAddNotesActionPayload): ISpecifiedAction<IAddNotesActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.ADD_NOTES, payload);
