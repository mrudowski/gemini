import React from 'react';
import UIWidget from '../../commons/components/UIWidget/UIWidget';
import UIButton from '../../commons/components/UIButton/UIButton';
import {useTranslation} from '../../translation';
import styles from './styles/LoadGameModal.module.scss';
import useSaveGames from '../saveGameModal/hooks/useSaveGames';
import {IConfirmationObject} from '../../../game/scenes/mainMenu/types';
import {loadGameStateFromLocal} from './utils/utils';
import SaveGameSlot from '../SaveGameSlot/SaveGameSlot';
import {useTypedDispatch, useTypedSelector} from '../../redux/store';
import {ISaveGameSlotId} from '../../saveGameStorage/types';
import {getIsFirstGame} from '../../World/worldSlice';

interface ILoadGameModal {
  isOpen: boolean;
  onClose: () => void;
  setConfirmationObject: React.Dispatch<React.SetStateAction<IConfirmationObject | null>>;
}

const LoadGameModal: React.FC<ILoadGameModal> = ({isOpen, onClose, setConfirmationObject}) => {
  const t = useTranslation();
  const dispatch = useTypedDispatch();
  const isFirstGame = useTypedSelector(getIsFirstGame);
  const {autoSaveSceneId, autoSaveDate, saveGames} = useSaveGames({isOpen});

  const onLoad = (slotId: ISaveGameSlotId) => {
    setConfirmationObject({
      prompt: t.ui.loadGameModal.loadGameConfirmation,
      onSubmit: () => {
        loadGameStateFromLocal(slotId, dispatch);
      },
    });
  };

  return (
    <>
      <UIWidget className={styles.root} isOpen={isOpen} onClose={onClose}>
        <p>{t.ui.loadGameModal.prompt}</p>
        <div className={styles.slots}>
          {isFirstGame ? (
            <SaveGameSlot id="auto" title={t.ui.saveGameSlot.autoSave} date="" sceneId="" className={styles.disabled} />
          ) : (
            <SaveGameSlot
              id="auto"
              title={t.ui.saveGameSlot.autoSave}
              date={autoSaveDate}
              sceneId={autoSaveSceneId}
              onClick={onLoad}
            />
          )}
          {saveGames.map(saveGame => (
            <SaveGameSlot
              key={saveGame.id}
              onClick={saveGame.sceneId ? onLoad : undefined}
              className={!saveGame.sceneId ? styles.disabled : ''}
              {...saveGame}
            />
          ))}
        </div>
        <div className={styles.buttons}>
          <UIButton onClick={onClose}>{t.ui.commons.close}</UIButton>
        </div>
      </UIWidget>
    </>
  );
};

export default LoadGameModal;
