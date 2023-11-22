import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRootState, IThunk} from '../redux/store';

interface IHerbariumWidgetState {
  visible: boolean;
  ready: boolean;
}

const initialState: IHerbariumWidgetState = {
  visible: false,
  ready: false,
};

const herbariumWidgetSlice = createSlice({
  name: 'herbariumWidget',
  initialState,
  reducers: {
    showHerbarium: (state: IHerbariumWidgetState) => {
      state.visible = true;
      state.ready = false;
    },
    hideHerbarium: (state: IHerbariumWidgetState) => {
      state.visible = false;
      state.ready = false;
    },
    setHerbariumAsReady: (state: IHerbariumWidgetState, action: PayloadAction<boolean>) => {
      state.ready = action.payload;
    },
  },
});

export default herbariumWidgetSlice.reducer;

// ------------ actions

const showHerbarium = herbariumWidgetSlice.actions.showHerbarium;
export const hideHerbarium = herbariumWidgetSlice.actions.hideHerbarium;
export const setHerbariumAsReady = herbariumWidgetSlice.actions.setHerbariumAsReady;

// ------------ thunks

export const toggleHerbarium = (): IThunk => (dispatch, getState) => {
  const state = getState();
  const isHerbariumVisible = getIsHerbariumVisible(state);
  if (isHerbariumVisible) {
    dispatch(hideHerbarium());
  } else {
    dispatch(showHerbarium());
  }
};

// ------------ selectors

export const getIsHerbariumVisible = (state: IRootState) => state.herbariumWidget.visible;
export const getIsHerbariumReady = (state: IRootState) => state.herbariumWidget.ready;
