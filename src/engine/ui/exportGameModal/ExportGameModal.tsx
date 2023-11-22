import React, {useMemo} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import classNames from 'classnames';
import UIWidget from '../../commons/components/UIWidget/UIWidget';
import UIButton from '../../commons/components/UIButton/UIButton';
import {useTranslation} from '../../translation';
import styles from './styles/ExportGameModal.module.scss';
import CopyToClipboardUI from './components/CopyToClipboardUI/CopyToClipboardUI';
import getGameStateToSave from '../utils/getGameStateToSave';

interface IExportGameModal {
  isOpen: boolean;
  onClose: () => void;
}

const ExportGameModal: React.FC<IExportGameModal> = ({isOpen, onClose}) => {
  const t = useTranslation();

  useHotkeys('esc', onClose, {
    enabled: isOpen,
  });

  // because the component leave/render all the time
  const accessCode = useMemo(() => {
    if (isOpen) {
      const gameStateToSave = getGameStateToSave('export');
      return window.btoa(JSON.stringify(gameStateToSave));
    }
    return '';
  }, [isOpen]);

  return (
    <UIWidget className={styles.root} isOpen={isOpen} onClose={onClose}>
      <p>
        <strong>{t.ui.exportGameModal.prompt1}</strong>
        <br />
        {t.ui.exportGameModal.prompt2}
      </p>
      {isOpen && accessCode && <CopyToClipboardUI accessCode={accessCode} />}
      <textarea readOnly={true} className={classNames('scrollbar--light', styles.textarea)} value={accessCode} />
      <div className={styles.buttons}>
        <UIButton onClick={onClose}>{t.ui.commons.close}</UIButton>
      </div>
    </UIWidget>
  );
};

export default ExportGameModal;
