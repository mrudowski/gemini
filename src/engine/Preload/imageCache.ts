/**
 * https://css-tricks.com/react-suspense-in-practice/
 * https://frontlive.pl/blog/react-suspense
 * https://css-tricks.com/pre-caching-image-with-react-suspense/
 * https://codesandbox.io/s/react-suspense-img-ly38r?file=/src/App.js:79-101
 */

const cache = {};

interface IImageCache {
  preload: (src: string) => Promise<boolean> | boolean;
  clearImg: (src: string) => void;
}

const imageCache: IImageCache = {
  preload(src) {
    if (!src) {
      throw new Error('Cannot preload ' + src + ' image');
      // return;
    }

    if (!cache[src]) {
      cache[src] = new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          // console.log('%c [mr] imageCache onLoad', 'color: Gold', src);
          cache[src] = true;
          resolve(cache[src]);
        };
        img.src = src;
        // It’s nice to have all our images preloaded nicely, but in real life
        // we probably don’t want to hold up rendering indefinitely just because
        // one or two straggling images are coming in slowly.
        // setTimeout(() => resolve({}), 7000);
      }).then(() => {
        cache[src] = true;
      });
    }

    if (cache[src] instanceof Promise) {
      // for suspense to catch
      throw cache[src];
    }
    return cache[src];
  },
  clearImg: src => {
    // @ts-ignore
    delete cache[src];
  },
};

export default imageCache;
