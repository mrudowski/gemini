import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRootState, IThunk} from '../redux/store';

interface INotebookWidgetState {
  visible: boolean;
  ready: boolean;
}

const initialState: INotebookWidgetState = {
  visible: false,
  ready: false,
};

const notebookWidgetSlice = createSlice({
  name: 'notebookWidget',
  initialState,
  reducers: {
    showNotebook: (state: INotebookWidgetState) => {
      state.visible = true;
      state.ready = false;
    },
    hideNotebook: (state: INotebookWidgetState) => {
      state.visible = false;
      state.ready = false;
    },
    setNotebookAsReady: (state: INotebookWidgetState, action: PayloadAction<boolean>) => {
      state.ready = action.payload;
    },
  },
});

export default notebookWidgetSlice.reducer;

// ------------ actions

const showNotebook = notebookWidgetSlice.actions.showNotebook;
export const hideNotebook = notebookWidgetSlice.actions.hideNotebook;
export const setNotebookAsReady = notebookWidgetSlice.actions.setNotebookAsReady;

// ------------ thunks

export const toggleNotebook = (): IThunk => (dispatch, getState) => {
  const state = getState();
  const isNotebookVisible = getIsNotebookVisible(state);
  if (isNotebookVisible) {
    dispatch(hideNotebook());
  } else {
    dispatch(showNotebook());
  }
};

// ------------ selectors

export const getIsNotebookVisible = (state: IRootState) => state.notebookWidget.visible;
export const getIsNotebookReady = (state: IRootState) => state.notebookWidget.ready;
