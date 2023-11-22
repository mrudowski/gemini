import React, {useCallback} from 'react';
import {useTypedDispatch, useTypedSelector} from '../../redux/store';
import CloseupScene from './components/CloseupScene/CloseupScene';
import {getLookCloserSceneId} from './lookCloserActionSlice';
import {endAction, playScript} from '../../scriptPlayer/scriptPlayerSlice';
import UIWidget from '../../commons/components/UIWidget/UIWidget';
import './styles/CloseupViewer.scss';
import ACTIONS from '../../actions/actions';

interface ICloseupViewer {}

const CloseupViewer: React.FC<ICloseupViewer> = () => {
  const sceneId = useTypedSelector(getLookCloserSceneId);
  const dispatch = useTypedDispatch();

  const isOpen = !!sceneId;

  const onOpenComplete = useCallback(() => {
    dispatch(endAction());
  }, [dispatch]);

  const onCloseComplete = useCallback(() => {
    dispatch(endAction());
  }, [dispatch]);

  const onClose = useCallback(() => {
    dispatch(playScript({script: [ACTIONS.closeCloseup()]}));
  }, [dispatch]);

  return (
    <UIWidget
      className="UIWidget--Closeup"
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      onOpenComplete={onOpenComplete}
      type="closeup"
    >
      <CloseupScene sceneId={sceneId} />
    </UIWidget>
  );
};

export default CloseupViewer;
