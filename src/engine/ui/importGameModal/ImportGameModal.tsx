import React, {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import classNames from 'classnames';
import UIWidget from '../../commons/components/UIWidget/UIWidget';
import UIButton from '../../commons/components/UIButton/UIButton';
import {useTranslation} from '../../translation';
import styles from './styles/ImportGameModal.module.scss';
import {IConfirmationObject} from '../../../game/scenes/mainMenu/types';
import {variants} from '../../commons/motion/variants';
import {useTypedDispatch} from '../../redux/store';
import {getGameStateFromAccessCodeWhenValid, importGameState} from './utils/utils';

const WRONG_CODE_DISPLAY_TIME_IN_MS = 3000;

interface IImportGameModal {
  isOpen: boolean;
  onClose: () => void;
  setConfirmationObject: React.Dispatch<React.SetStateAction<IConfirmationObject | null>>;
}

const ImportGameModal: React.FC<IImportGameModal> = ({isOpen, onClose, setConfirmationObject}) => {
  const t = useTranslation();
  const dispatch = useTypedDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [wrongAccessCode, setWrongAccessCode] = useState(false);

  useEffect(() => {
    let timer;
    if (wrongAccessCode) {
      timer = setTimeout(() => {
        setWrongAccessCode(false);
      }, WRONG_CODE_DISPLAY_TIME_IN_MS);
    }
    return () => clearTimeout(timer);
  }, [wrongAccessCode]);

  const importSaveGame = () => {
    const accessCode = textAreaRef.current?.value;
    const gameState = getGameStateFromAccessCodeWhenValid(accessCode);
    if (!gameState) {
      setWrongAccessCode(true);
      return;
    }
    setConfirmationObject({
      prompt: t.ui.importGameModal.importGameConfirmation,
      onSubmit: () => {
        importGameState(gameState, dispatch);
      },
    });
  };

  return (
    <UIWidget className={styles.root} isOpen={isOpen} onClose={onClose}>
      <p>
        {t.ui.importGameModal.prompt1}
        <br />
        {t.ui.importGameModal.prompt2}
      </p>
      <textarea className={classNames('scrollbar--light', styles.textarea)} ref={textAreaRef} />
      <div className={styles.buttons}>
        <UIButton onClick={onClose}>{t.ui.commons.close}</UIButton>
        <div>
          <AnimatePresence>
            {wrongAccessCode && (
              <motion.span
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={variants}
                className={styles.wrongAccessCode}
              >
                {t.ui.importGameModal.wrongAccessCode}
              </motion.span>
            )}
          </AnimatePresence>
          <UIButton onClick={importSaveGame}>{t.ui.importGameModal.importSaveGame}</UIButton>
        </div>
      </div>
    </UIWidget>
  );
};

export default ImportGameModal;
