import React, {useMemo} from 'react';
import './styles/HerbariumActivePageLoader.scss';
import {capitalizeFirstLetter} from '../../../commons/utils/utils';
import {HERBARIUM_PAGE_ORDER} from '../../../../game/herbarium/herbariumPages';

interface IHerbariumActivePageLoader {
  activePageNumber: number;
}

const capitalizeFirstLetterImportedHereForLazy = capitalizeFirstLetter;

const HerbariumActivePageLoader: React.FC<IHerbariumActivePageLoader> = ({activePageNumber}) => {
  const HerbariumActivePage = useMemo(() => {
    const activePageName = HERBARIUM_PAGE_ORDER[activePageNumber - 1] || HERBARIUM_PAGE_ORDER[0];
    return React.lazy(
      () => import(`../../../../game/herbarium/pages/${capitalizeFirstLetterImportedHereForLazy(activePageName)}Page`)
    );
  }, [activePageNumber]);

  return <HerbariumActivePage />;
};

export default HerbariumActivePageLoader;
