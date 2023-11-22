import React, {useCallback} from 'react';
import {motion} from 'framer-motion';
import {useHotkeys} from 'react-hotkeys-hook';
import './styles/CreditsWidget.scss';
import classNames from 'classnames';
import {creditsVariants, showTextVariants} from '../../../commons/motion/variants';
import PreloadImages from '../../../Preload/PreloadImages';
import {useTranslation} from '../../../translation';
import {useTypedSelector} from '../../../redux/store';
import {creditsSelectors} from '../../../actions/showCredits/showCreditsActionSlice';

interface ICreditsWidget {
  onClick: (e) => void;
  onVisible: (visible: boolean) => void;
}

const CreditsWidget: React.FC<ICreditsWidget> = ({onClick, onVisible}) => {
  const ready = useTypedSelector(creditsSelectors.isReady);
  const image = useTypedSelector(creditsSelectors.getImage);
  const dimmed = useTypedSelector(creditsSelectors.isDimmedBackdrop);
  const t = useTranslation();

  const onAnimationComplete = useCallback(
    definition => {
      if (definition === 'visible') {
        onVisible(true);
      }
    },
    [onVisible]
  );

  const onClickProxy = e => {
    if (ready) {
      onClick(e);
    }
  };

  useHotkeys(
    'esc',
    keyboardEvent => {
      // method because useHotKeys have second hotkeysEvent param
      onClickProxy(keyboardEvent);
    },
    [onClickProxy]
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={creditsVariants}
      onAnimationComplete={onAnimationComplete}
      className="CreditsWidget"
      style={image ? {backgroundImage: `url(${image})`} : undefined}
      onClick={onClickProxy}
    >
      {image && <PreloadImages images={[image]} />}
      <div className={classNames('CreditsWidget__container', dimmed && 'CreditsWidget__container--dimmed')}>
        <motion.div className="CreditsWidget__content" variants={showTextVariants}>
          <div className="CreditsWidget__left">
            <section>
              <h2>{t.credits.story.header}</h2>
              {t.credits.story.author}
            </section>
            <section>
              <h2>{t.credits.code.header}</h2>
              {t.credits.code.author}
            </section>
            <section>
              <h2>{t.credits.music.header}</h2>
              {t.credits.music.author}
            </section>
            <section>
              <h2>{t.credits.editor.header}</h2>
              {t.credits.editor.author}
            </section>
            <section>
              <h2>{t.credits.translationGerman.header}</h2>
              {t.credits.translationGerman.author}
            </section>
            <section>
              <h2>{t.credits.thanks}</h2>
            </section>
            <section>2023</section>
          </div>
          <div className="CreditsWidget__right">
            <section>
              <h2>{t.credits.patrons.header}</h2>
              <p>{t.credits.patrons.info}</p>
              {t.credits.patrons.list}
            </section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CreditsWidget;
