import imageCache from './imageCache';
import {IImage} from './types';

/**
 * not used
 */

type IUsePreload = (images: IImage[]) => void;

const usePreload: IUsePreload = images => {
  // will throw promise - which works with suspens and suspend component till
  images.forEach(image => {
    imageCache.preload(image);
  });
};

export default usePreload;
