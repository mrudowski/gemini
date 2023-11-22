import React from 'react';
import classNames from 'classnames';
import './styles/GemStyle.scss';
import {useTypedSelector} from '../redux/store';
import {isShakeCameraActive} from '../actions/shakeCamera/shakeCameraActionSlice';

const GemViewport = ({children}) => {
  const shakeCameraActive = useTypedSelector(isShakeCameraActive);

  const classes = classNames('Gem__viewport', shakeCameraActive && 'Gem__viewport--shake shake-constant');

  return <div className={classes}>{children}</div>;
};

export default GemViewport;
