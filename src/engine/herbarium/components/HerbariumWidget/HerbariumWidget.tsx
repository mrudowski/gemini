import React, {useCallback, useEffect} from 'react';
import {batch} from 'react-redux';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import UIWidget from '../../../commons/components/UIWidget/UIWidget';
import {turnOffGemLock, turnOnGemLock} from '../../../redux/tempSlice';
import Herbarium from '../Herbarium/Herbarium';
import {getIsHerbariumVisible, hideHerbarium, setHerbariumAsReady} from '../../herbariumWidgetSlice';
import './styles/HerbariumWidget.scss';

interface IHerbariumWidget {}

const HerbariumWidget: React.FC<IHerbariumWidget> = () => {
  const isHerbariumVisible = useTypedSelector(getIsHerbariumVisible);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (isHerbariumVisible) {
      dispatch(turnOnGemLock());
    }
  }, [isHerbariumVisible, dispatch]);

  const onClose = useCallback(() => {
    dispatch(hideHerbarium());
  }, [dispatch]);

  const onOpenComplete = useCallback(() => {
    batch(() => {
      dispatch(setHerbariumAsReady(true));
      dispatch(turnOffGemLock());
    });
  }, [dispatch]);

  const onCloseComplete = useCallback(() => {
    // do nothing
  }, []);

  return (
    <UIWidget
      className="UIWidget--Herbarium"
      isOpen={isHerbariumVisible}
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      onOpenComplete={onOpenComplete}
      type="herbarium"
    >
      <Herbarium />
    </UIWidget>
  );
};

export default HerbariumWidget;
