import {ISoundsDefs} from '../../engine/sound/soundSlice';
import storyMusic from './assets/sounds/music/musicStory.webm';
import themeMusic from './assets/sounds/music/musicTheme.webm';
import thunder1 from './assets/sounds/thunder1.webm';
import thunder2 from './assets/sounds/thunder2.webm';
import wind2 from './assets/sounds/wind2.webm';
import write from './assets/sounds/write.webm';

export const SOUNDS = {
  thunder1: 'thunder1',
  thunder2: 'thunder2',
  wind2: 'wind2',
  write: 'write',

  //music
  storyMusic: 'storyMusic',
  themeMusic: 'themeMusic',
} as const;

export const SOUNDS_DEFS: ISoundsDefs = {
  thunder1: {
    src: thunder1,
    volume: 0.3,
    loop: true,
  },
  thunder2: {
    src: thunder2,
    volume: 0.3,
    loop: true,
  },
  wind2: {
    src: wind2,
    volume: 0.4,
    loop: true,
  },
  write: {
    src: write,
    volume: 0.8,
  },

  // music
  storyMusic: {
    src: storyMusic,
    volume: 0.5,
    loop: true,
  },
  themeMusic: {
    src: themeMusic,
    volume: 0.5,
    loop: true,
  },
};

export const SOUNDS_TRACKS = {
  storyCombo: [SOUNDS.storyMusic, SOUNDS.thunder1, SOUNDS.thunder2, SOUNDS.wind2],
};
