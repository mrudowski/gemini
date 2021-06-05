import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISpecifiedAction, IWaitActionPayload} from '../actions';
import {IRootState, IThunk} from '../redux/store';
import {endAction} from './scriptPlayerSlice';

type IWaitAction = ISpecifiedAction<IWaitActionPayload>;

interface IWaitActionState {
  action: IWaitAction | null,
}

const initialState: IWaitActionState = {
  action: null,
};

const waitActionSlice = createSlice({
  name: 'waitAction',
  initialState,
  reducers: {
    startWaitActionPrivate: (state: IWaitActionState, action: PayloadAction<{action: IWaitAction}>) => {
      const {
        action: actionToSet
      } = action.payload;
      state.action = actionToSet;
    },
    endWaitAction: (state: IWaitActionState) => {
      console.log('%c [mr] endWaitAction', 'background-color:Gold; color: black');
      state.action = null;
    },
  }
});

export default waitActionSlice.reducer;

const startWaitActionPrivate = waitActionSlice.actions.startWaitActionPrivate;
export const endWaitAction = waitActionSlice.actions.endWaitAction;

// ------------ thunk

export const startWaitAction = ({action}: {action: IWaitAction}): IThunk => (dispatch) => {
  const {duration = 1} = action.payload;

  console.log('%c [mr] duration', 'background-color:Gold; color: black', duration);

  dispatch(startWaitActionPrivate({action}));
  setTimeout(() => {
    dispatch(endAction());
  }, duration * 1000);
};

// ------------ selectors

export const getWaitAction = createSelector(
  [(state: IRootState) => state.waitAction.action],
  action => action
);
