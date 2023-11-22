import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {IRootState, IThunk} from '../redux/store';
import {endAction} from '../scriptPlayer/scriptPlayerSlice';
import {ISpecifiedAction} from '../actions/types';
import NOTEBOOK_NOTES from '../../game/notebook/notebookNotes';
import {notebookInitialState} from '../../game/notebook/notebookState';
import {IAddNotesActionPayload} from '../actions/notebookActions/notebookActions';
import {playSoundOutsideTheAction} from '../sound/soundSlice';
import {SOUNDS} from '../../game/sounds/sounds';

export type INotebookNoteId = keyof typeof NOTEBOOK_NOTES;

export interface INotebookState {
  notes: INotebookNoteId[];
}

const notebookSlice = createSlice({
  name: 'notebook',
  initialState: notebookInitialState,
  reducers: {
    addNotes: (state: INotebookState, action: PayloadAction<INotebookNoteId[]>) => {
      const notesToAdd = action.payload;
      notesToAdd.forEach(noteToAdd => {
        if (!state.notes.includes(noteToAdd)) {
          state.notes.push(noteToAdd);
        }
      });
    },
    removeNotes: (state: INotebookState, action: PayloadAction<INotebookNoteId[]>) => {
      const notesToRemove = action.payload;
      notesToRemove.forEach(noteToRemove => {
        if (!state.notes.includes(noteToRemove)) {
          throw new Error('missing note "' + noteToRemove + '" during removeNote action');
        }
        state.notes = state.notes.filter(item => item !== noteToRemove);
      });
    },
    restoreNotebookState: (state: INotebookState, action: PayloadAction<INotebookState>) => {
      return action.payload;
    },
    resetNotebookState: () => {
      return notebookInitialState;
    },
  },
});

export default notebookSlice.reducer;

// ------------ thunk

export const addNotes =
  (notesIdsToAdd: INotebookNoteId[]): IThunk =>
  (dispatch, getState) => {
    const areThereAnyNewNotes = getAreThereAnyNewNotes(getState(), notesIdsToAdd);
    batch(() => {
      if (areThereAnyNewNotes) {
        dispatch(playSoundOutsideTheAction(SOUNDS.write));
      }
      dispatch(notebookSlice.actions.addNotes(notesIdsToAdd));
    });
  };
export const removeNotes =
  (notesIdsToRemove: INotebookNoteId[]): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(notebookSlice.actions.removeNotes(notesIdsToRemove));
    });
  };
export const restoreNotebookState =
  (notebookState: INotebookState): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(notebookSlice.actions.restoreNotebookState(notebookState));
    });
  };
export const resetNotebookState = (): IThunk => dispatch => {
  batch(() => {
    dispatch(notebookSlice.actions.resetNotebookState());
  });
};

// --------------

type IAddNotesAction = ISpecifiedAction<IAddNotesActionPayload>;
export const startAddNotesAction =
  (action: IAddNotesAction): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(addNotes(action.payload.notes));
      dispatch(endAction());
    });
  };

export const endAddNotesAction = (): IThunk => () => {
  // do nothing for now
};

// ------------ selectors

export const getNotebookNotes = createSelector([(state: IRootState) => state.notebook.notes], notes => notes);
// export const getNotebookNotesAmount = createSelector([getNotebookNotes], notes => notes.length);

export const getNotesIndex = createSelector(
  [getNotebookNotes, (state: IRootState, noteId: INotebookNoteId) => noteId],
  (notes, noteId) => notes.indexOf(noteId)
);

// export const getIsNoteInNotebook = (noteId: INotebookNoteId) =>
//   createSelector([getNotebookNotes], notes => notes.includes(noteId));

export const getIsNoteInNotebookMap = createSelector([getNotebookNotes], notes => {
  return Object.fromEntries(Object.keys(NOTEBOOK_NOTES).map((noteId: any) => [noteId, notes.includes(noteId)]));
});

export const getAreThereAnyNewNotes = createSelector(
  [getNotebookNotes, (state: IRootState, noteIds: INotebookNoteId[]) => noteIds],
  (notes, noteIds) => {
    return noteIds.some(noteId => !notes.includes(noteId));
  }
);
