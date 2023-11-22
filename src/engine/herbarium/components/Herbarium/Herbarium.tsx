import React from 'react';
import './styles/Herbarium.scss';
import {useTypedDispatch} from '../../../redux/store';
import {HERBARIUM_PAGE_ORDER} from '../../../../game/herbarium/herbariumPages';
import PreloadImages from '../../../Preload/PreloadImages';
import backgroundImage from './assets/images/background.jpg';
import cornerBackImage from './assets/images/cornerBack.png';
import cornerNextImage from './assets/images/cornerNext.png';
import {useGlobalState} from '../../../stateHooks/stateHooks';
import {setGlobalMultiState} from '../../../World/worldSlice';
import HerbariumActivePageLoader from '../HerbariumActivePageLoader/HerbariumActivePageLoader';
import GemSuspense from '../../../commons/components/GemSuspense/GemSuspense';

const imageToPreload = [backgroundImage, cornerBackImage, cornerNextImage];

interface IHerbarium {}

const Herbarium: React.FC<IHerbarium> = () => {
  const {herbariumActivePage} = useGlobalState();
  const dispatch = useTypedDispatch();

  const isPrev = herbariumActivePage > 1;
  const isNext = herbariumActivePage < HERBARIUM_PAGE_ORDER.length;

  const changePage = (pageNumber: number) => {
    dispatch(setGlobalMultiState({stateToUpdate: {herbariumActivePage: pageNumber}}));
  };

  return (
    <div className="Herbarium">
      <PreloadImages images={imageToPreload} />
      <div className="Herbarium__page-container">
        <GemSuspense kind="ui">
          <HerbariumActivePageLoader activePageNumber={herbariumActivePage} />
        </GemSuspense>
      </div>
      {isPrev && (
        <div
          className="Herbarium__action Herbarium__action--prev gem-hotspot"
          onClick={() => {
            changePage(herbariumActivePage - 1);
          }}
        />
      )}
      {isNext && (
        <div
          className="Herbarium__action Herbarium__action--next gem-hotspot"
          onClick={() => {
            changePage(herbariumActivePage + 1);
          }}
        />
      )}
    </div>
  );
};

export default Herbarium;
