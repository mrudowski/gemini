import React, {useEffect, useRef} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import styles from './styles/SaveGameTitleModal.module.scss';
import {useTranslation} from '../../../../translation';
import UIWidget from '../../../../commons/components/UIWidget/UIWidget';
import UIButton from '../../../../commons/components/UIButton/UIButton';
import {ISaveGameTitleModalData} from '../../types';

interface ISaveGameTitleModal {
  data: ISaveGameTitleModalData | null;
  onClose: () => void;
}

const MAX_LENGTH = 32;

const SaveGameTitleModal: React.FC<ISaveGameTitleModal> = ({data, onClose}) => {
  const t = useTranslation();
  const isOpen = !!data;
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitProxy = () => {
    if (data) {
      const title = inputRef.current?.value.trim() || data.slotId; //encodeURIComponent(_.escape(trueThis.$input.val()));
      data.onSubmit(data.slotId, title);
      onClose();
    }
  };

  useHotkeys('esc', onClose, {
    enabled: isOpen,
    enableOnTags: ['INPUT'],
  });

  useHotkeys('enter', onSubmitProxy, {
    enabled: isOpen,
    enableOnTags: ['INPUT'],
  });

  useHotkeys('space', () => {}, {enabled: false});

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isOpen]);

  // data &&
  // to reset input defaultValue

  return (
    <UIWidget className={styles.root} isOpen={isOpen} onClose={onClose}>
      <p className={styles.prompt}>{t.ui.saveGameModal.saveTitleDialogPrompt}</p>
      {data && <input type="text" maxLength={MAX_LENGTH} ref={inputRef} defaultValue={data.title} />}
      <div className={styles.buttons}>
        <UIButton onClick={onClose}>{t.ui.commons.cancel}</UIButton>
        <UIButton onClick={onSubmitProxy}>{t.ui.saveGameModal.save}</UIButton>
      </div>
    </UIWidget>
  );
};

export default SaveGameTitleModal;
