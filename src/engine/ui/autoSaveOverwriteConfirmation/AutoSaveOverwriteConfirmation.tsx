import React from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import UIWidget from '../../commons/components/UIWidget/UIWidget';
import UIButton from '../../commons/components/UIButton/UIButton';
import {useTranslation} from '../../translation';
import styles from './styles/AutoSaveOverwriteConfirmation.module.scss';

interface IInGameMenu {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  prompt: string;
}

const AutoSaveOverwriteConfirmation: React.FC<IInGameMenu> = ({isOpen, onClose, onSubmit, prompt}) => {
  const t = useTranslation();

  useHotkeys('esc', onClose, {
    enabled: isOpen,
  });

  return (
    <UIWidget className={styles.root} isOpen={isOpen} onClose={onClose}>
      <p>{prompt}</p>
      <div className={styles.buttons}>
        <UIButton onClick={onClose}>{t.ui.commons.no}</UIButton>
        <UIButton onClick={onSubmit}>{t.ui.commons.yes}</UIButton>
      </div>
    </UIWidget>
  );
};

export default AutoSaveOverwriteConfirmation;
