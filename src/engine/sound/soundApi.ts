import {Howl} from 'howler';
import {SOUNDS_DEFS} from '../../game/sounds/sounds';
import {ISoundId} from './soundSlice';
import {store} from '../redux/store';
import {getIsSoundOn} from '../Gem/gemSlice';

type ISoundsBySrc = Record<string, {howlSound: Howl; soundId: ISoundId}>;

const FADE_IN_DURATION = 2000;
const FADE_OUT_DURATION = 2000;
const howlSoundsBySrc: ISoundsBySrc = {};
let lastSoundsToPlay: ISoundId[] = [];

const fadeOutBgSound = (sound: Howl, soundSrc: string) => {
  if (sound && sound.playing()) {
    // console.log('%c [mr] fadeOutBgSound', 'background-color:Gold; color: black', {soundSrc});
    sound.on('fade', () => {
      // needed because it fires on fadeIn too (although we are very careful not to)
      if (sound.volume() > 0) {
        // console.log('%c [mr] FATAL mistake', 'background-color:red; color: white', {
        //   soundSrc,
        //   volume: sound.volume(),
        // });
        return;
      }
      sound.off('fade');
      sound.stop();
      delete howlSoundsBySrc[soundSrc];
      // console.log('%c [mr] after del', 'background-color:red; color: black', howlSoundsBySrc);
    });
    sound.fade(sound.volume(), 0, FADE_OUT_DURATION);
  }
};

const fadeInBgSound = (sound: Howl, volume: number) => {
  if (sound) {
    sound.off('fade');
    // sound.volume(0); // to cancel fade // not needed
    if (sound.playing()) {
      sound.fade(sound.volume(), volume, FADE_IN_DURATION);
    } else {
      sound.play(); // play have to be first, before fade because play starts preloading it!
      sound.fade(0, volume, FADE_IN_DURATION);
    }
  }
};

export const suspenseAllBgSounds = () => {
  Object.entries(howlSoundsBySrc).forEach(([soundSrc, {howlSound}]) => {
    fadeOutBgSound(howlSound, soundSrc);
  });
};

export const resumeBgSounds = () => {
  playBgSounds(lastSoundsToPlay);
};

export const playBgSounds = (soundsToPlay: ISoundId[]) => {
  // console.log('%c [mr] playBgSounds', 'background-color:Gold; color: black', {soundsToPlay});

  // we set it first when we decide to turn on sounds later
  lastSoundsToPlay = soundsToPlay;

  const isSoundOn = getIsSoundOn(store.getState());
  if (!isSoundOn) return;

  // fade out all which is not on the sounds list
  Object.entries(howlSoundsBySrc).forEach(([soundSrc, {howlSound, soundId}]) => {
    if (!soundsToPlay.includes(soundId)) {
      fadeOutBgSound(howlSound, soundSrc);
    }
  });

  // play if needed and add to array
  soundsToPlay.forEach(soundId => {
    const soundDef = SOUNDS_DEFS[soundId];
    if (!soundDef) {
      throw new Error('missing soundDef for "' + soundId + '" soundId');
    }

    if (howlSoundsBySrc[soundDef.src]) {
      // do nothing here
    } else {
      const howlSound = new Howl({
        // preload: true, by default; if we set it to false we have to load() sound manually
        ...soundDef,
      });
      howlSoundsBySrc[soundDef.src] = {
        howlSound,
        soundId,
      };
      // console.log('%c [mr] after add', 'background-color:green; color: black', howlSoundsBySrc);
    }
    // console.log('%c [mr] fadeInBgSound', 'background-color:orange; color: black', soundDef.src);
    fadeInBgSound(howlSoundsBySrc[soundDef.src].howlSound, soundDef.volume || 1);
  });
  // console.log(
  //   '%c [mr] after ALL add',
  //   'background-color:green; color: white',
  //   Object.values(howlSoundsBySrc).map(sound => sound.soundId)
  // );
};
