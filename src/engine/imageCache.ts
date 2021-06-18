/**
 * https://css-tricks.com/react-suspense-in-practice/
 * https://frontlive.pl/blog/react-suspense
 * https://css-tricks.com/pre-caching-image-with-react-suspense/
 * https://codesandbox.io/s/react-suspense-img-ly38r?file=/src/App.js:79-101
 */

const cache = {};

interface IImageCache {
  preload: (src: string) => Promise<boolean> | boolean
  clearImg: (src: string) => void
}

const imageCache: IImageCache = {
  preload(src) {
    if (!src) {
      throw new Error('Cannot preload ' + src + ' image');
      // return;
    }

    if (!cache[src]) {
      cache[src] = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          cache[src] = true;
          resolve(cache[src]);
        };
        img.src = src;
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
  clearImg: (src) => {
    // @ts-ignore
    delete cache[src];
  }
};

export default imageCache;
