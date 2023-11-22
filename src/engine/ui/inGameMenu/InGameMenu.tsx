import React, {useCallback} from 'react';
import {batch} from 'react-redux';
import {useTypedDispatch, useTypedSelector} from '../../redux/store';
import {
  getIsExportGameModalVisible,
  getIsInGameMenuVisible,
  getIsSaveGameModalVisible,
  hideExportGameModal,
  hideSaveGameModal,
  showExportGameModal,
  showSaveGameModal,
  toggleInGameMenu,
} from './inGameMenuSlice';
import UIWidget from '../../commons/components/UIWidget/UIWidget';
import './styles/InGameMenu.scss';
import UIButton from '../../commons/components/UIButton/UIButton';
import {useTranslation} from '../../translation';
import UISoundControl from '../../commons/components/UISoundControl/UISoundControl';
import {exitToTitleThunk} from '../../redux/thunks';
import SaveGameModal from '../saveGameModal/SaveGameModal';
import ExportGameModal from '../exportGameModal/ExportGameModal';

interface IInGameMenu {}

// TODO move utils to commons!

const InGameMenu: React.FC<IInGameMenu> = () => {
  const t = useTranslation();
  const dispatch = useTypedDispatch();
  const isInGameMenuVisible = useTypedSelector(getIsInGameMenuVisible);
  const isSaveGameModalVisible = useTypedSelector(getIsSaveGameModalVisible);
  const isExportGameModalVisible = useTypedSelector(getIsExportGameModalVisible);

  const onClose = useCallback(() => {
    dispatch(toggleInGameMenu());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(showSaveGameModal());
  }, [dispatch]);

  const onExport = useCallback(() => {
    dispatch(showExportGameModal());
  }, [dispatch]);

  const onExitToTitle = useCallback(() => {
    batch(() => {
      dispatch(toggleInGameMenu());
      dispatch(exitToTitleThunk());
    });
  }, [dispatch]);

  return (
    <>
      <UIWidget className="UIWidget--InGameMenu" isOpen={isInGameMenuVisible} onClose={onClose}>
        <div className="UIWidget--InGameMenu__buttons">
          <UIButton onClick={onClose}>{t.ui.inGameMenu.returnToGame}</UIButton>
          <UIButton onClick={onSave}>{t.ui.inGameMenu.saveGame}</UIButton>
          <UIButton onClick={onExport}>{t.ui.inGameMenu.exportGame}</UIButton>
          <UIButton onClick={onExitToTitle}>{t.ui.inGameMenu.exitToTitle}</UIButton>
        </div>
        <UISoundControl />
      </UIWidget>
      <SaveGameModal isOpen={isSaveGameModalVisible} onClose={() => dispatch(hideSaveGameModal())} />
      <ExportGameModal isOpen={isExportGameModalVisible} onClose={() => dispatch(hideExportGameModal())} />
    </>
  );
};

export default InGameMenu;
