import {persistor} from './store';

export const persistorPersist = () => {
  // console.log('%c 💾 [persistor] persist', 'background-color:black; color: PowderBlue');
  persistor.persist();
};

export const persistorPause = () => {
  // console.log('%c 💾 [persistor] pause', 'background-color:black; color: PowderBlue');
  persistor.pause();
};
