import {useDispatch} from 'react-redux';
import {
  combineReducers,
  configureStore,
  Action,
  ThunkAction
} from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import gemSlice from './gemSlice';
import verbMenuReducer from '../VerbMenu/verbMenuSlice';

const rootReducer = combineReducers({
  gem: gemSlice.reducer,
  verbMenu: verbMenuReducer
});

const getReducer = (): any => {
  // return persistReducer(getPersistConfig(), rootReducer);
  return rootReducer;
};

const makeStore = (preloadedState?) => {
  return configureStore({
    reducer: getReducer(),
    preloadedState
  });
};

export const store = makeStore();

export type IRootState = ReturnType<typeof rootReducer>;
// TODO check it
export type IDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<IDispatch>()
export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;
export type IThunk = ThunkAction<void, IRootState, null, Action<string>>;