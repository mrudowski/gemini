import {useEffect, useState} from 'react';
import {useTypedSelector} from '../../../redux/store';
import {getLastSavedSceneId} from '../../../World/worldSlice';
import {getAutosaveDate} from '../../../Gem/gemSlice';
import {ISaveGame, ISaveGameTitleModalData} from '../types';
import {getSaveGames} from '../utils/utils';

const initialSaveGame = [];

interface IUseSaveGamesArgs {
  isOpen: boolean;
  saveGameTitleModalData?: ISaveGameTitleModalData | null;
}

const useSaveGames = ({isOpen, saveGameTitleModalData = null}: IUseSaveGamesArgs) => {
  const autoSaveSceneId = useTypedSelector(getLastSavedSceneId);
  const autoSaveDate = useTypedSelector(getAutosaveDate);
  const [saveGames, setSaveGames] = useState<ISaveGame[]>(initialSaveGame);

  useEffect(() => {
    if (isOpen && saveGameTitleModalData === null) {
      setSaveGames(getSaveGames());
    }
  }, [isOpen, saveGameTitleModalData]);

  return {
    autoSaveSceneId,
    autoSaveDate,
    saveGames,
  };
};

export default useSaveGames;
