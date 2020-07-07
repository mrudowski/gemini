import {useDispatch} from 'react-redux';
import {
  combineReducers,
  configureStore,
  Action,
  ThunkAction
} from '@reduxjs/toolkit';
import gemSlice from './gemSlice';
import actionSlice from './actionSlice';

const rootReducer = combineReducers({
  gem: gemSlice.reducer,
  action: actionSlice.reducer,
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
export const useGemDispatch = () => useDispatch<IDispatch>()
export type IThunk = ThunkAction<void, IRootState, null, Action<string>>;
