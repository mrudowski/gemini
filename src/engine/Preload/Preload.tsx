import React from 'react';
import imageCache from '../imageCache';

type IImage = string;

interface IPreload {
  images: IImage[];
}

const Preload: React.FC<IPreload> = ({images}) => {
  // will throw promise - which works with suspens and suspend component till
  images.forEach(image => {
    imageCache.preload(image);
  });

  return null;
};

export default Preload;
