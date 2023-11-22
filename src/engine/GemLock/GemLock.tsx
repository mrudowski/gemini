import React from 'react';
import classNames from 'classnames';
import {useTypedSelector} from '../redux/store';
import './styles/GemLock.scss';
import {getIsGemLoading, getIsGemLockOn} from '../redux/tempSliceSelectors';
import Spinner from '../commons/components/Spinner/Spinner';

interface IGemLock {}

const GemLock: React.FC<IGemLock> = () => {
  const gemLockOn = useTypedSelector(getIsGemLockOn);
  const gemLoading = useTypedSelector(getIsGemLoading);

  if (!gemLockOn && !gemLoading) return null;

  return <div className={classNames('GemLock', gemLoading && 'GemLoading')}>{gemLoading && <Spinner />}</div>;
};

export default GemLock;
