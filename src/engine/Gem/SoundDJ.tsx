import React, {useEffect} from 'react';
import {Howl} from 'howler';
import stream from '../../sampleGame01/assets/sounds/stream.webm';

const sound = new Howl({
  src: [stream],
  loop: true
});


const SoundDJ = () => {

  console.log('%c [mr] SoundDJ init', 'color: Gold');

  useEffect(() => {
    //sound.play();
  }, []);

  return null;
};

export default React.memo(SoundDJ);
