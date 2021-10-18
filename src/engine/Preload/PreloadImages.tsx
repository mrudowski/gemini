import React from 'react';
import PreloadImage from './PreloadImage';

type IImage = string;

interface IPreloadImages {
  images: IImage[];
}

const PreloadImages: React.FC<IPreloadImages> = ({images}) => {
  console.log('%c [mr]-------------', 'background-color:Gold; color: black', images);
  return (
    <>
      {images.map(image => (
        <PreloadImage key={image} image={image} />
      ))}
    </>
  );
};

export default PreloadImages;
