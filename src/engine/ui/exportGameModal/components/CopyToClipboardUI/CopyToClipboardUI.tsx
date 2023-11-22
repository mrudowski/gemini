import React, {useState} from 'react';
import UIButton from '../../../../commons/components/UIButton/UIButton';
import {useTranslation} from '../../../../translation';
import styles from './styles/CopyToClipboardUI.module.scss';
import copyToClipboard from './utils/copyToClipboard';

interface ICopyToClipboardUI {
  accessCode: string;
}

const CopyToClipboardUI: React.FC<ICopyToClipboardUI> = ({accessCode}) => {
  const t = useTranslation();
  const [isAccessCodeCopied, setIsAccessCodeCopied] = useState(false);

  const copyToClipboardProxy = () => {
    copyToClipboard(accessCode, setIsAccessCodeCopied);
  };

  return (
    <div className={styles.root}>
      {isAccessCodeCopied && <span className={styles.accessCodeCopied}>{t.ui.exportGameModal.codeCopied}</span>}
      <UIButton onClick={copyToClipboardProxy}>{t.ui.exportGameModal.copyToClipboard}</UIButton>
    </div>
  );
};

export default CopyToClipboardUI;
