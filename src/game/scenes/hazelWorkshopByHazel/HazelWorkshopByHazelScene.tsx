import React from 'react';
import ACTIONS from '../../../engine/actions/actions';
import PreloadImages from '../../../engine/Preload/PreloadImages';
import Scene from '../../../engine/scene/Scene';
import {useSceneState} from '../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../engine/translation';
import {SOUNDS_TRACKS} from '../../sounds/sounds';
import SCENES from '../scenes';
import hazelWorkshop from './assets/images/hazelWorkshop.jpg';
import hazelCutscene1Image from './assets/images/Hazel_cutscene01.png';
import hazelCutscene2Image from './assets/images/Hazel_cutscene02.png';
import BoxPoi from './pois/BoxPoi';
import ElmPoi from './pois/ElmPoi';
import FlowersPoi from './pois/FlowersPoi';
import HazelPoi from './pois/HazelPoi';
import HazelViewPoi from './pois/HazelViewPoi';
import StairsPoi from './pois/StairsPoi';
import TablePoi from './pois/TablePoi';

const imagesToPreload = [hazelCutscene1Image, hazelCutscene2Image];

const cutsceneMargin = 60;
const cutsceneCommonStyles = {
  width: 1027,
  height: 284,
  left: '50%',
  marginLeft: -Math.round(1027 / 2),
};

const HazelWorkshopByHazelScene = () => {
  const t = useTranslation();
  const sceneState = useSceneState(SCENES.hazelWorkshopByHazel);

  return (
    <Scene
      id={SCENES.hazelWorkshopByHazel}
      image={hazelWorkshop}
      sounds={SOUNDS_TRACKS.storyCombo}
      // hideHud={sceneState.visited} // as alternative to hideHid inside onBeforeEnter
      onBeforeEnter={[
        {
          when: !sceneState.visited,
          script: [ACTIONS.hideHud(), ACTIONS.switchLightOff()],
        },
      ]}
      onEnter={[
        {
          when: !sceneState.visited,
          script: [
            ACTIONS.showImage({
              image: hazelCutscene1Image,
              style: {
                ...cutsceneCommonStyles,
                top: cutsceneMargin,
              },
            }),
            ACTIONS.wait({duration: 2}),
            ACTIONS.showImage({
              image: hazelCutscene2Image,
              style: {
                ...cutsceneCommonStyles,
                bottom: cutsceneMargin,
              },
            }),
            ACTIONS.wait({duration: 1}),
            ACTIONS.showText({
              text: t.scenes.hazelWorkshopByHazel.cutscene1,
              style: {
                bottom: 190,
                left: 620,
                width: 220,
                fontSize: 16,
                textAlign: 'center',
              },
            }),
            ACTIONS.hideAllImages(),
            ACTIONS.wait({duration: 1}),
            ACTIONS.switchLightOn(),
            ACTIONS.wait({duration: 1}),
            ACTIONS.showText({
              text: t.scenes.hazelWorkshopByHazel.onEnter1,
              style: {
                bottom: 400,
                left: 440,
                width: 200,
                fontSize: 16,
              },
            }),
            ACTIONS.showText({
              text: t.scenes.hazelWorkshopByHazel.onEnter1b,
              style: {
                bottom: 400,
                left: 440,
                width: 200,
                fontSize: 16,
              },
            }),
            ACTIONS.wait({duration: 0.5}),
            ACTIONS.setSceneState({
              scene: SCENES.hazelWorkshopByHazel,
              state: {
                HazelDeskFront: true,
              },
            }),
            ACTIONS.wait({duration: 2}),
            ACTIONS.talk({text: t.scenes.hazelWorkshopByHazel.onEnter2}),
            ACTIONS.endTalk(),
            ACTIONS.showHud(),
          ],
        },
      ]}
    >
      <PreloadImages images={imagesToPreload} />

      <TablePoi />
      <StairsPoi />
      <HazelPoi />
      <HazelViewPoi />
      <ElmPoi />
      <BoxPoi />
      <FlowersPoi />
    </Scene>
  );
};

export default HazelWorkshopByHazelScene;
