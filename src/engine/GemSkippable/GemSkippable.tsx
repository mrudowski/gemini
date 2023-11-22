import React from 'react';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import './styles/GemSkippable.scss';
import {skipToActionOnInterruptThunk} from '../scriptPlayer/scriptPlayerSlice';
import {getSkipToActionOnInterrupt} from '../scriptPlayer/scriptPlayerSliceSelectors';

interface IGemLock {}

const GemSkippable: React.FC<IGemLock> = () => {
  const dispatch = useTypedDispatch();
  const gemSkippable = useTypedSelector(getSkipToActionOnInterrupt);

  if (!gemSkippable) return null;

  const skip = () => {
    dispatch(skipToActionOnInterruptThunk());
  };

  return <div className="GemSkippable" onClick={skip} />;
};

export default GemSkippable;
