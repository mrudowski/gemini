import React from 'react';
import Scene from '../../../engine/scene/Scene';
import SCENES from '../scenes';
import ACTIONS from '../../../engine/actions/actions';
import SETTINGS from '../../settings';
import {useTranslation} from '../../../engine/translation';
import {introductionSceneInitialState} from './state';
import posterImage from './assets/images/poster.jpg';
import PreloadImages from '../../../engine/Preload/PreloadImages';

const imagesToPreload = [posterImage];

const IntroductionScene = () => {
  const t = useTranslation();

  return (
    <Scene
      id={SCENES.introduction}
      hideHud={true}
      onBeforeEnter={[
        {
          script: [ACTIONS.setSceneState({scene: SCENES.introduction, state: introductionSceneInitialState})],
        },
      ]}
      onEnter={[
        {
          skipToActionOnClick: 'skipHere',
          script: [
            ACTIONS.showText({text: t.intro.gameBy, position: 'center', autoPlayAfter: 1}),
            ACTIONS.showImage({
              image: posterImage,
              border: false,
              dimmedBackdrop: false,
              style: {
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#000000',
                backgroundPosition: 'center center',
              },
            }),
            ACTIONS.wait({duration: 2}),
            ACTIONS.hideAllImages({id: 'skipHere'}),
            ACTIONS.gotoScene({scene: SETTINGS.MAIN_SCENE}),
          ],
        },
      ]}
    >
      <PreloadImages images={imagesToPreload} />
    </Scene>
  );
};

export default IntroductionScene;
