import React from 'react';
import comicBorderImage from '../ui/assets/images/comicBorder.png';
import leafsBorderImage from '../ui/assets/images/leafsBorder.png';
import leafsBorderActiveImage from '../ui/assets/images/leafsBorderActive.png';
import oldPaperBgImage from '../ui/assets/images/oldPaperBg.jpg';
import paperBgImage from '../ui/assets/images/paperBg.jpg';
import uiTriggers from '../ui/assets/images/uiTriggers.png';
import transparentImage from '../ui/assets/images/transparent.png';
import cursorArrowImage from '../Gem/assets/images/cursor_arrow.png';
import cursorArrowPointerImage from '../Gem/assets/images/cursor_arrow_pointer.png';
import flowerIconImage from '../Inventory/assets/images/flowerIcon.png';
import leafIconImage from '../Inventory/assets/images/leafIcon.png';
import stalkIconImage from '../Inventory/assets/images/stalkIcon.png';
import PreloadImages from '../Preload/PreloadImages';

const imagesToPreload = [
  comicBorderImage,
  leafsBorderImage,
  leafsBorderActiveImage,
  oldPaperBgImage,
  paperBgImage,
  uiTriggers,
  transparentImage,
  cursorArrowImage,
  cursorArrowPointerImage,
  flowerIconImage,
  leafIconImage,
  stalkIconImage,
];

const PreloadUI: React.FC = () => <PreloadImages images={imagesToPreload} />;

export default PreloadUI;
