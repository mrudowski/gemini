import React from 'react';
import imageCache from '../imageCache';

type IImage = string;

interface IPreloadImage {
  image: IImage;
}

const hideIt = {display: 'none'};

const PreloadImage: React.FC<IPreloadImage> = ({image}) => {
  // will throw promise - which works with suspens and suspend component till
  imageCache.preload(image);
  return <img src={image} alt="" style={hideIt} />;
};

export default PreloadImage;
