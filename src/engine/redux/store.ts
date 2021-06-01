import {useDispatch} from 'react-redux';
import {
  combineReducers,
  configureStore,
  Action,
  ThunkAction
} from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import gemSliceReducer from './gemSlice';
import worldSliceReducer from './worldSlice';
import tempSliceReducer from './tempSlice';
import verbMenuReducer from '../VerbMenu/verbMenuSlice';
import scriptPlayerReducer from '../scriptPlayer/scriptPlayerSlice';
import talkActionReducer from '../scriptPlayer/talkActionSlice';
import waitActionReducer from '../scriptPlayer/waitActionSlice';

const rootReducer = combineReducers({
  gem: gemSliceReducer,
  // world === gem?
  world: worldSliceReducer, // TODO this should be injected in makeStore in the future
  temp: tempSliceReducer,
  verbMenu: verbMenuReducer, // TODO slice?
  scriptPlayer: scriptPlayerReducer,
  talkAction: talkActionReducer,
  waitAction: waitActionReducer,
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
export const useTypedDispatch = () => useDispatch<IDispatch>();
export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;
export type IThunk = ThunkAction<void, IRootState, null, Action<string>>;
