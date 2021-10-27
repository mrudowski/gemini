import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {Action, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import gemSliceReducer from './gemSlice';
import worldSliceReducer from './worldSlice';
import tempSliceReducer from './tempSlice';
import devToolsSliceReducer from '../DevTools/devToolsSlice';
import verbMenuReducer from '../VerbMenu/verbMenuSlice';
import scriptPlayerReducer from '../scriptPlayer/scriptPlayerSlice';
import talkActionReducer from '../scriptPlayer/talkActionSlice';
import waitActionReducer from '../scriptPlayer/waitActionSlice';

const rootReducer = combineReducers({
  gem: gemSliceReducer,
  // world === gem?
  world: worldSliceReducer, // TODO this should be injected in makeStore in the future
  temp: tempSliceReducer,
  devTools: devToolsSliceReducer,
  verbMenu: verbMenuReducer, // TODO slice?
  scriptPlayer: scriptPlayerReducer,
  talkAction: talkActionReducer,
  waitAction: waitActionReducer,
});

const persistedStoreVersion = 1;
const persistConfig = {
  key: 'gemTOS3',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['gem', 'world'],
  version: persistedStoreVersion,
};

const getReducer = (): any => {
  return persistReducer(persistConfig, rootReducer as any);
  // return rootReducer;
};

const makeStore = (preloadedState?) => {
  return configureStore({
    reducer: getReducer(),
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

export type IRootState = ReturnType<typeof rootReducer>;
// TODO check it
export type IDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<IDispatch>();
export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;
export type IThunk = ThunkAction<void, IRootState, null, Action<string>>;
