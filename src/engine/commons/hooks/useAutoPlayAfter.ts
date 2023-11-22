import {useEffect} from 'react';
import {ISpecifiedAction} from '../../actions/types';
import {ITalkActionPayload} from '../../actions/talk/talk';
import {IShowTextActionPayload} from '../../actions/showText/showText';

let timeoutId;

const useAutoPlayAfter = ({action, playNext, ready}) => {
  const {autoPlayAfter = undefined} = action
    ? (action as ISpecifiedAction<ITalkActionPayload | IShowTextActionPayload>).payload
    : {};

  useEffect(() => {
    // console.log('%c [mr] useEffect', 'background-color:red; color: black', playNext);
    if (autoPlayAfter !== undefined && ready) {
      timeoutId = setTimeout(() => {
        playNext();
      }, autoPlayAfter * 1000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [autoPlayAfter, playNext, ready]);
};

export default useAutoPlayAfter;
