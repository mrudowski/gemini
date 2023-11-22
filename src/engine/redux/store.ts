import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AnyAction, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {
  createMigrate,
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
//import storage from 'redux-persist/es/storage';
import {PersistedState} from 'redux-persist/es/types';
import {getPersistConfig} from 'redux-deep-persist';
import gemSliceReducer from '../Gem/gemSlice';
import tempSliceReducer from './tempSlice';
import worldSliceReducer from '../World/worldSlice';
import devToolsSliceReducer from '../DevTools/devToolsSlice';
import verbMenuReducer from '../VerbMenu/verbMenuSlice';
import scriptPlayerReducer from '../scriptPlayer/scriptPlayerSlice';
import showTextActionReducer from '../actions/showText/showTextActionSlice';
import showImageActionReducer from '../actions/showImage/showImageActionSlice';
import talkActionReducer from '../actions/talk/talkActionSlice';
import waitActionReducer from '../actions/wait/waitActionSlice';
import useWithActionReducer from '../Inventory/useWithActionSlice';
import lookCloserActionReducer from '../closeup/CloseupViewer/lookCloserActionSlice';
import inventoryReducer from '../Inventory/inventorySlice';
import notebookReducer from '../notebook/notebookSlice';
import inventoryWidgetReducer from '../Inventory/inventoryWidgetSlice';
import notebookWidgetReducer from '../notebook/notebookWidgetSlice';
import herbariumWidgetReducer from '../herbarium/herbariumWidgetSlice';
import soundReducer from '../sound/soundSlice';
import switchLightActionReducer from '../actions/switchLight/switchLightActionSlice';
import shakeCameraActionReducer from '../actions/shakeCamera/shakeCameraActionSlice';
import showCreditsActionReducer from '../actions/showCredits/showCreditsActionSlice';
import inGameMenuReducer from '../ui/inGameMenu/inGameMenuSlice';
import hudReducer from '../Hud/hudSlice';
import SETTINGS from '../../game/settings';
import storage from './storage';

const rootReducer = combineReducers({
  gem: gemSliceReducer,
  // world === gem?
  world: worldSliceReducer,
  inventory: inventoryReducer,
  notebook: notebookReducer,
  temp: tempSliceReducer,
  devTools: devToolsSliceReducer,
  verbMenu: verbMenuReducer,
  scriptPlayer: scriptPlayerReducer,
  showTextAction: showTextActionReducer,
  showImageAction: showImageActionReducer,
  talkAction: talkActionReducer,
  waitAction: waitActionReducer,
  useWithAction: useWithActionReducer,
  lookCloserAction: lookCloserActionReducer,
  inventoryWidget: inventoryWidgetReducer,
  notebookWidget: notebookWidgetReducer,
  herbariumWidget: herbariumWidgetReducer,
  sound: soundReducer,
  switchLightAction: switchLightActionReducer,
  shakeCameraAction: shakeCameraActionReducer,
  showCreditsActions: showCreditsActionReducer,
  inGameMenu: inGameMenuReducer,
  hud: hudReducer,
});

const getMigrations = (ver: number, migrations = {}) => {
  return {
    [ver]: () => {
      // if we return empty object during migration, all state will be overwritten by new one (init)
      return {} as PersistedState;
    },
    ...migrations,
  };
};

const persistedStoreVersion = 23;
const persistConfig = getPersistConfig({
  key: SETTINGS.SAVE_GAME_NAME,
  keyPrefix: '',
  storage,
  whitelist: ['gem', 'world', 'inventory', 'notebook'],
  rootReducer, // your root reducer must be also passed here
  // it's rather debounce or worse, then throttle :(
  // - if we set it to 1000ms
  // - it will start after 1000ms!
  // - and cumulate so 5 operation is 5x1000 so it wait 5 seconds!
  // unreliable? YES for 500 last save is sometimes lost! https://github.com/rt2zz/redux-persist/issues/1108#issuecomment-579494710
  // https://github.com/rt2zz/redux-persist/issues/720#issuecomment-384816981
  throttle: 0,
  // https://github.com/rt2zz/redux-persist/issues/1313
  // https://github.com/rt2zz/redux-persist/issues/1308
  // https://github.com/rt2zz/redux-persist/issues/717
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  // @ts-ignore
  timeout: null,
  version: persistedStoreVersion,
  migrate: createMigrate(getMigrations(persistedStoreVersion), {debug: false}),
});

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
export const persistor = persistStore(store, {
  // @ts-ignore https://github.com/rt2zz/redux-persist/pull/1342 and https://github.com/rt2zz/redux-persist/issues/1341
  // manualPersist: true,
});
// persistor pause is not the same as manualPersist. It allows to load state from localstorage and then pause
persistor.pause();

export type IRootState = ReturnType<typeof rootReducer>;
export type IDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<IDispatch>();
export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;
// we had to remove "@types/react-redux": "^7.1.15" because it install as deps old redux@4.0.5
export type IThunk<T = void> = ThunkAction<T, IRootState, void, AnyAction>;
