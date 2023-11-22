import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {IHideImageAction, IShowImageAction} from './showImage';
import {turnOffGemLock, turnOnGemLock} from '../../redux/tempSlice';
import {IRootState, IThunk} from '../../redux/store';

interface IShowImageActionState {
  images: Record<string, ReturnType<IShowImageAction>>;
}

const initialState: IShowImageActionState = {
  images: {},
};

const showImageActionSlice = createSlice({
  name: 'showImageAction',
  initialState,
  reducers: {
    showImage: (state: IShowImageActionState, action: PayloadAction<ReturnType<IShowImageAction>>) => {
      const imageId = action.payload.payload.image;
      if (state.images[imageId]) {
        throw new Error('[showImageAction:showImageAction] image "' + imageId + '" already exists in set');
      } else {
        state.images[imageId] = action.payload;
      }
    },
    hideImage: (state: IShowImageActionState, action: PayloadAction<ReturnType<IHideImageAction>>) => {
      const imageId = action.payload.payload.image;
      if (state.images[imageId]) {
        delete state.images[action.payload.payload.image];
      } else {
        throw new Error('[showImageAction:hideImageAction] No image "' + imageId + '" to hide!');
      }
    },
    hideAllImages: (state: IShowImageActionState) => {
      state.images = initialState.images;
    },
  },
});

export default showImageActionSlice.reducer;

// ------------ thunks

export const startShowImageAction =
  (action: ReturnType<IShowImageAction>): IThunk =>
  dispatch => {
    batch(() => {
      // not that way because we want to do it always and only on show and hide - not between
      // because between can be dialogue / showText etc.
      // if (getImagesToShowAsArray(getState()).length === 0) {
      //   dispatch(turnOnGemLock());
      // }
      dispatch(turnOnGemLock());
      dispatch(showImageActionSlice.actions.showImage(action));
    });
  };

export const endShowImageAction = () => dispatch => {
  dispatch(turnOffGemLock());
};

// - - -

export const startHideImageAction = (action: ReturnType<IHideImageAction>) => dispatch => {
  batch(() => {
    dispatch(turnOnGemLock());
    dispatch(showImageActionSlice.actions.hideImage(action));
  });
};

export const endHideImageAction = (): IThunk => dispatch => {
  dispatch(turnOffGemLock());
};

// - - -

export const startHideAllImagesAction = () => dispatch => {
  batch(() => {
    dispatch(turnOnGemLock());
    dispatch(showImageActionSlice.actions.hideAllImages());
  });
};

export const endHideAllImagesAction = () => dispatch => {
  dispatch(turnOffGemLock());
};

// ------------ selectors

export const getImagesToShowAsArray = createSelector([(state: IRootState) => state.showImageAction.images], images =>
  Object.values(images)
);
