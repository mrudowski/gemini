import React, {useEffect} from 'react';
import {addVisibilityChangeEventListener, removeVisibilityChangeEventListener} from './onVisibilityChange';
import {useTypedSelector} from '../redux/store';
import {getIsSoundOn} from '../Gem/gemSlice';
import {resumeBgSounds, suspenseAllBgSounds} from './soundApi';

const SoundDJ = () => {
  // console.log('%c [mr] SoundDJ init', 'background-color:black; color: orange');
  const isSoundOn = useTypedSelector(getIsSoundOn);

  useEffect(() => {
    addVisibilityChangeEventListener();
    return () => {
      removeVisibilityChangeEventListener();
    };
  }, []);

  useEffect(() => {
    if (isSoundOn) {
      resumeBgSounds();
    } else {
      suspenseAllBgSounds();
    }
  }, [isSoundOn]);

  return null;
};

export default React.memo(SoundDJ);
