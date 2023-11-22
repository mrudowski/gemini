import {resumeBgSounds, suspenseAllBgSounds} from './soundApi';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#example
 */

// Set the name of the hidden property and the change event for visibility
let hidden, visibilityChange;
if (typeof document.hidden !== 'undefined') {
  // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document['msHidden'] !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document['webkitHidden'] !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

const handleVisibilityChange = () => {
  //if (gem.dj.isActive() && document[hidden]) {
  // console.log('%c [mr] handleVisibilityChange', 'background-color:Gold; color: black', document[hidden]);
  if (document[hidden]) {
    suspenseAllBgSounds();
  } else {
    resumeBgSounds();
  }
};

export const addVisibilityChangeEventListener = () => {
  // Handle page visibility change
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
};

export const removeVisibilityChangeEventListener = () => {
  // Handle page visibility change
  document.removeEventListener(visibilityChange, handleVisibilityChange, false);
};
