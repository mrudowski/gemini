import React from 'react';
import {useTypedSelector} from '../redux/store';
import {getWaitAction} from '../scriptPlayer/waitActionSlice';
import './styles/GemLock.scss';

interface IGemLock {
}

const GemLock: React.FC<IGemLock> = () => {
  const action = useTypedSelector(getWaitAction);

  if (!action) return null;

  return (
    <div className="GemLock" />
  );
};

export default GemLock;
