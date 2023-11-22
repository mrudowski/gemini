import React, {useState} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import UIWidget from '../../commons/components/UIWidget/UIWidget';
import UIButton from '../../commons/components/UIButton/UIButton';
import {useTranslation} from '../../translation';
import styles from './styles/SaveGameModal.module.scss';
import SaveGameSlot from '../SaveGameSlot/SaveGameSlot';
import {ISaveGameTitleModalData} from './types';
import SaveGameTitleModal from './components/SaveGameTitleModal/SaveGameTitleModal';
import {saveGameStateToLocal} from './utils/utils';
import useSaveGames from './hooks/useSaveGames';
import {ISaveGameSlotId} from '../../saveGameStorage/types';

interface ISaveGameModal {
  isOpen: boolean;
  onClose: () => void;
}

const SaveGameModal: React.FC<ISaveGameModal> = ({isOpen, onClose}) => {
  const t = useTranslation();
  const [saveGameTitleModalData, setSaveGameTitleModalData] = useState<ISaveGameTitleModalData | null>(null);
  const {autoSaveSceneId, autoSaveDate, saveGames} = useSaveGames({isOpen, saveGameTitleModalData});

  useHotkeys('esc', onClose, {
    enabled: isOpen && !saveGameTitleModalData,
  });

  const onSave = (slotId: ISaveGameSlotId, title) => {
    setSaveGameTitleModalData({slotId, title, onSubmit: saveGameStateToLocal});
  };

  return (
    <>
      <UIWidget className={styles.root} isOpen={isOpen} onClose={onClose}>
        <p>
          <strong>{t.ui.saveGameModal.prompt1}</strong>
          <br />
          {t.ui.saveGameModal.prompt2}
        </p>
        <div className={styles.slots}>
          <SaveGameSlot id="auto" title={t.ui.saveGameSlot.autoSave} date={autoSaveDate} sceneId={autoSaveSceneId} />
          {saveGames.map(saveGame => (
            <SaveGameSlot key={saveGame.id} onClick={onSave} {...saveGame} />
          ))}
        </div>
        <div className={styles.buttons}>
          <UIButton onClick={onClose}>{t.ui.commons.close}</UIButton>
        </div>
      </UIWidget>
      <SaveGameTitleModal
        data={saveGameTitleModalData}
        onClose={() => {
          setSaveGameTitleModalData(null);
        }}
      />
    </>
  );
};

export default SaveGameModal;
