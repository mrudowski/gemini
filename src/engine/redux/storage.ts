import getStorage from 'redux-persist/es/storage/getStorage';

function createWebStorage(type: string): any {
  const storage = getStorage(type);
  return {
    getItem: (key: string): Promise<string> => {
      return new Promise(resolve => {
        resolve(storage.getItem(key));
      });
    },
    setItem: (key: string, item: string): Promise<void> => {
      console.log('%c 💾 [persistor] Saved!', 'background-color:black; color: PowderBlue');
      return new Promise(resolve => {
        resolve(storage.setItem(key, item));
      });
    },
    removeItem: (key: string): Promise<void> => {
      return new Promise(resolve => {
        resolve(storage.removeItem(key));
      });
    },
  };
}

export default createWebStorage('local');
