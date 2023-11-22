import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRootState, IThunk} from '../../redux/store';
import {IImage} from '../../Preload/types';
import {defaultPayload, IShowCreditsAction} from './showCredits';
import {updateStats} from '../../stats/updateStats';

interface IShowCreditsActionState {
  visible: boolean;
  ready: boolean;
  image: IImage | null;
  dimmedBackdrop: boolean;
}

const initialState: IShowCreditsActionState = {
  visible: false,
  ready: false,
  image: defaultPayload.image!,
  dimmedBackdrop: defaultPayload.dimmedBackdrop!,
};

const showCreditsActionSlice = createSlice({
  name: 'showCreditsActions',
  initialState,
  reducers: {
    showCredits: (state: IShowCreditsActionState, action: PayloadAction<ReturnType<IShowCreditsAction>>) => {
      state.visible = true;
      state.ready = false;
      state.image = action.payload.payload.image!;
      state.dimmedBackdrop = action.payload.payload.dimmedBackdrop!;
    },
    showCreditsShort: (
      state: IShowCreditsActionState,
      action: PayloadAction<{
        image: IShowCreditsActionState['image'];
        dimmedBackdrop: IShowCreditsActionState['dimmedBackdrop'];
      }>
    ) => {
      state.visible = true;
      state.ready = false;
      state.image = action.payload.image;
      state.dimmedBackdrop = action.payload.dimmedBackdrop;
    },
    hideCredits: (state: IShowCreditsActionState) => {
      state.visible = false;
    },
    setCreditsAsReady: (state: IShowCreditsActionState, action: PayloadAction<boolean>) => {
      state.ready = action.payload;
    },
  },
});

export default showCreditsActionSlice.reducer;

// ------------ actions

export const showCreditsShort = showCreditsActionSlice.actions.showCreditsShort;

// ------------ thunks

export const startShowCreditsAction =
  (action: ReturnType<IShowCreditsAction>): IThunk =>
  dispatch => {
    dispatch(showCreditsActionSlice.actions.showCredits(action));
    if (action.payload.gameCompleted) {
      updateStats('gameCompleted');
    }
    // batch(() => {
    //   dispatch(turnOnGemLock());
    //   dispatch(showCreditsActionSlice.actions.showCredits());
    // });
  };

// export const endShowCreditsAction = () => dispatch => {
//   //dispatch(turnOffGemLock());
// };

export const hideCredits = () => dispatch => {
  dispatch(showCreditsActionSlice.actions.hideCredits());
  // batch(() => {
  //   dispatch(turnOnGemLock());
  //   dispatch(showCreditsActionSlice.actions.hideCredits());
  // });
};

export const setCreditsAsReady = (ready: boolean) => dispatch => {
  dispatch(showCreditsActionSlice.actions.setCreditsAsReady(ready));
  // batch(() => {
  //   dispatch(showCreditsActionSlice.actions.setCreditsAsReady(ready));
  //   dispatch(turnOffGemLock());
  // });
};

// ------------ selectors

const isVisible = (state: IRootState) => state.showCreditsActions.visible;
const isReady = (state: IRootState) => state.showCreditsActions.ready;
const getImage = (state: IRootState) => state.showCreditsActions.image;
const isDimmedBackdrop = (state: IRootState) => state.showCreditsActions.dimmedBackdrop;

export const creditsSelectors = {
  isVisible,
  isReady,
  getImage,
  isDimmedBackdrop,
};
