import React from 'react';
import leafsBorderImage from '../ui/assets/images/leafsBorder.png';
import leafsBorderActiveImage from '../ui/assets/images/leafsBorderActive.png';
import oldPaperBgImage from '../ui/assets/images/oldPaperBg.jpg';
import paperBgImage from '../ui/assets/images/paperBg.jpg';
import cursorArrowImage from '../Gem/assets/images/cursor_arrow.png';
import cursorArrowPointerImage from '../Gem/assets/images/cursor_arrow_pointer.png';
import PreloadImage from '../Preload/PreloadImage';

const imagesToPreload = [leafsBorderImage, leafsBorderActiveImage, oldPaperBgImage, paperBgImage, cursorArrowImage, cursorArrowPointerImage];

const PreloadUI: React.FC = () => {
  return (
    <>
      {imagesToPreload.map(image => (
        <PreloadImage key={image} image={image} />
      ))}
    </>
  );
};

export default PreloadUI;
