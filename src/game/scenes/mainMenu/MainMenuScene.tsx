import React, {useState} from 'react';
import {motion, useAnimation} from 'framer-motion';
import {useHotkeys} from 'react-hotkeys-hook';
import Scene from '../../../engine/scene/Scene';
import SCENES from '../scenes';
import backgroundImage from './assets/images/background.jpg';
import UIButton from '../../../engine/commons/components/UIButton/UIButton';
import {useTranslation} from '../../../engine/translation';
import UISoundControl from '../../../engine/commons/components/UISoundControl/UISoundControl';
import './styles/MainMenu.scss';
import {longVariants} from '../../../engine/commons/motion/variants';
import UILangControl from '../../../engine/commons/components/UILangControl/UILangControl';
import {useTypedDispatch, useTypedSelector} from '../../../engine/redux/store';
import {continueGameThunk, startNewGameThunk} from '../../../engine/redux/thunks';
import {getIsFirstGame} from '../../../engine/World/worldSlice';
import AutoSaveOverwriteConfirmation from '../../../engine/ui/autoSaveOverwriteConfirmation/AutoSaveOverwriteConfirmation';
import useModal from '../../../engine/commons/hooks/useModal';
import LoadGameModal from '../../../engine/ui/loadGameModal/LoadGameModal';
import {IConfirmationObject} from './types';
import ImportGameModal from '../../../engine/ui/importGameModal/ImportGameModal';
import {turnOffGemLock, turnOnGemLock} from '../../../engine/redux/tempSlice';
import {isAnyCustomSaveGame} from '../../../engine/ui/saveGameModal/utils/utils';
import {showCreditsShort} from '../../../engine/actions/showCredits/showCreditsActionSlice';
import {SOUNDS} from '../../sounds/sounds';

const version = process.env.REACT_APP_GEM_VERSION || 'DEV';

const MainMenuScene = () => {
  const t = useTranslation();
  const dispatch = useTypedDispatch();
  const controls = useAnimation();
  const isFirstGame = useTypedSelector(getIsFirstGame);
  const loadGameDisabled = isFirstGame && !isAnyCustomSaveGame();
  const {isModalOpen: isLoadGameModalOpen, openModal: openLoadGameModal, closeModal: closeLoadGameModal} = useModal();
  const {
    isModalOpen: isImportGameModalOpen,
    openModal: openImportGameModal,
    closeModal: closeImportGameModal,
  } = useModal();
  const [confirmationObject, setConfirmationObject] = useState<IConfirmationObject | null>(null);

  useHotkeys('esc', closeLoadGameModal, {
    enabled: isLoadGameModalOpen && !confirmationObject,
  });

  useHotkeys('esc', closeImportGameModal, {
    enabled: isImportGameModalOpen && !confirmationObject,
    enableOnTags: ['TEXTAREA'],
  });

  const continueGame = () => {
    dispatch(continueGameThunk());
  };

  const newGame = () => {
    if (isFirstGame) {
      dispatch(startNewGameThunk());
    } else {
      setConfirmationObject({
        prompt: t.mainMeMnu.newGameConfirmation,
        onSubmit: () => {
          dispatch(startNewGameThunk());
        },
      });
    }
  };

  const loadGame = () => {
    openLoadGameModal();
  };

  const importGame = () => {
    openImportGameModal();
  };

  const showCredits = () => {
    dispatch(showCreditsShort({dimmedBackdrop: true, image: backgroundImage}));
  };

  return (
    <>
      <Scene
        id={SCENES.mainMenu}
        image={backgroundImage}
        sounds={[SOUNDS.themeMusic]}
        hideHud={true}
        onEnterInternalAction={async () => {
          dispatch(turnOnGemLock());
          await controls.start(longVariants.visible);
          dispatch(turnOffGemLock());
        }}
      >
        <motion.div className="MainMenu__content" initial="hidden" animate={controls} variants={longVariants}>
          <div className="MainMenu__title">
            <div className="MainMenu__chapter">III</div>
          </div>
          <div className="MainMenu__actions">
            <div className="MainMenu__btnGroup">
              <UIButton theme="text" onClick={continueGame} disabled={isFirstGame}>
                {t.mainMeMnu.continueGame}
              </UIButton>
              <UIButton theme="text" onClick={newGame}>
                {t.mainMeMnu.newGame}
              </UIButton>
            </div>
            <div className="MainMenu__btnGroup">
              <UIButton theme="text" onClick={loadGame} disabled={loadGameDisabled}>
                {t.mainMeMnu.loadGame}
              </UIButton>
              <UIButton theme="text" onClick={importGame}>
                {t.mainMeMnu.importGame}
              </UIButton>
            </div>
            <div className="MainMenu__btnGroup">
              <UIButton theme="text" onClick={showCredits}>
                {t.mainMeMnu.credits}
              </UIButton>
            </div>
          </div>
          <div className="MainMenu__options">
            <UISoundControl theme="text" />
            <UILangControl theme="text" />
          </div>
          <div className="MainMenu__supportBox">
            <div className="MainMenu__supportBox__text">{t.mainMeMnu.supportUs}</div>
            <div className="MainMenu__supportBox__links">
              <a href="https://www.paypal.me/marekrudowski" className="gem-hotspot" target="_blank" rel="noreferrer">
                paypal
              </a>
              <a href="https://www.patreon.com/MarekRudowski" className="gem-hotspot" target="_blank" rel="noreferrer">
                patreon
              </a>
            </div>
            <i className="MainMenu__supportBox__icon" />
          </div>
          <div className="MainMenu__signatureBox">
            <div className="MainMenu__signatureBox__socialIcons">
              <a
                className="gem-hotspot"
                title="facebook"
                href="https://www.facebook.com/traderofstories"
                target="_blank"
                rel="noreferrer"
              >
                f
              </a>
            </div>
            <div className="MainMenu__signatureBox__gameBy">
              {t.mainMeMnu.gameBy} <span>|</span> v{version}
            </div>
          </div>
        </motion.div>
      </Scene>
      <LoadGameModal
        isOpen={isLoadGameModalOpen}
        onClose={closeLoadGameModal}
        setConfirmationObject={setConfirmationObject}
      />
      <ImportGameModal
        isOpen={isImportGameModalOpen}
        onClose={closeImportGameModal}
        setConfirmationObject={setConfirmationObject}
      />
      <AutoSaveOverwriteConfirmation
        isOpen={!!confirmationObject}
        onClose={() => {
          setConfirmationObject(null);
        }}
        onSubmit={confirmationObject ? confirmationObject?.onSubmit : () => {}}
        prompt={confirmationObject?.prompt || ''}
      />
    </>
  );
};

export default MainMenuScene;
