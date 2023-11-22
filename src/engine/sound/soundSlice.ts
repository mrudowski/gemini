import {createSlice} from '@reduxjs/toolkit';
import {Howl, HowlOptions} from 'howler';
import {IThunk} from '../redux/store';
import {ISpecifiedAction} from '../actions/types';
import {endAction} from '../scriptPlayer/scriptPlayerSlice';
import {SOUNDS, SOUNDS_DEFS} from '../../game/sounds/sounds';
import {getIsSoundOn} from '../Gem/gemSlice';
import {IPlaySoundActionPayload} from '../actions/playSound/playSound';

export interface ISoundDef extends HowlOptions {
  // id: ISoundId;
  src: string; // overwriting Howl type
}

export type ISoundId = keyof typeof SOUNDS;

export type ISoundsDefs = Record<ISoundId, ISoundDef>;

interface ISoundState {
  //sounds: IInventoryItemId[];
}

const initialState: ISoundState = {};

const soundSlice = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    // removeItems: (state: IInventoryState, action: PayloadAction<IInventoryItemId[]>) => {
    //   const itemsToRemove = action.payload;
    //   itemsToRemove.forEach(itemToRemove => {
    //     if (!state.items.includes(itemToRemove)) {
    //       throw new Error('missing item "' + itemToRemove + '" during removeItem action');
    //     }
    //     state.items = state.items.filter(item => item !== itemToRemove);
    //   });
    // },
  },
});

export default soundSlice.reducer;

// ------------ actions

//export const addItems = soundSlice.actions.addItems;

// ------------ thunk

type IPlaySoundAction = ISpecifiedAction<IPlaySoundActionPayload>;

const getSound = (soundOn: boolean, soundId: ISoundId) => {
  if (!soundOn) {
    return null;
  }

  // play sound
  const soundDef = SOUNDS_DEFS[soundId];
  if (!soundDef) {
    throw new Error('missing soundDef for "' + soundId + '" soundId');
  }
  const sound = new Howl({
    // preload: true, by default; if we set it to false we have to load() sound manually
    ...soundDef,
  });
  return sound;
};

export const playSoundOutsideTheAction =
  (soundId: ISoundId): IThunk =>
  (dispatch, getState) => {
    const soundOn = getIsSoundOn(getState());
    const sound = getSound(soundOn, soundId);
    if (!sound) {
      return;
    }
    sound.play();
  };

export const playSoundAction =
  (action: IPlaySoundAction): IThunk =>
  (dispatch, getState) => {
    const soundOn = getIsSoundOn(getState());
    const soundId = action.payload.sound;
    const sound = getSound(soundOn, soundId);
    if (!sound) {
      dispatch(endAction());
      return;
    }
    sound.play();
    dispatch(endAction());
  };

// ------------ selectors

// export const getInventoryItems = createSelector([(state: IRootState) => state.inventory.items], items => items);
