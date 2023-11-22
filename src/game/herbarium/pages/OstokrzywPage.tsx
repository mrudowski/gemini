import React from 'react';
import {HERBARIUM_PAGES} from '../herbariumPages';
import {useTranslation} from '../../../engine/translation';
import image from '../assets/images/ostokrzyw.png';
import HerbariumPage from '../../../engine/herbarium/components/HerbariumPage/HerbariumPage';

const OstokrzywPage = () => {
  const t = useTranslation();

  return (
    <HerbariumPage id={HERBARIUM_PAGES.ostokrzyw} image={image}>
      <h1>{t.herbarium.pages.ostokrzyw.title}</h1>
      <p>{t.herbarium.pages.ostokrzyw.p1}</p>
      <p>{t.herbarium.pages.ostokrzyw.p2}</p>
      <p>{t.herbarium.pages.ostokrzyw.p3}</p>
      <p>{t.herbarium.pages.ostokrzyw.p4}</p>
    </HerbariumPage>
  );
};

export default OstokrzywPage;
