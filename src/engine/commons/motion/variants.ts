import {Variants} from 'framer-motion';

export const variants: Variants = {
  hidden: {opacity: 0},
  visible: {opacity: 1},
};

export const longVariants: Variants = {
  hidden: {opacity: 0, transition: {duration: 2}},
  visible: {opacity: 1, transition: {duration: 2}},
};

export const poiVariants: Variants = {
  hidden: {opacity: 0, transition: {duration: 1}},
  visible: {opacity: 1, transition: {duration: 1.5}},
};

export const poiHelperVariants: Variants = {
  initial: {opacity: 0, scale: 2},
  visible: {opacity: [null, 1], scale: [null, 1]},
  exit: {
    opacity: 0,
    scale: 2,
    transition: {
      duration: 1,
    },
  },
};

export const creditsVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {duration: 1, easings: 'easeOut', when: 'afterChildren'},
  },
  visible: {
    opacity: 1,
    transition: {duration: 1, easings: 'easeIn', when: 'beforeChildren'},
  },
};
export const showTextVariants: Variants = {
  hidden: {opacity: 0, transition: {duration: 1, easings: 'easeOut'}},
  visible: {opacity: 1, transition: {duration: 1, easings: 'easeIn'}},
};

export const showImageVariants: Variants = {
  hidden: {opacity: 0, transition: {duration: 1, easings: 'easeOut'}},
  visible: {opacity: 1, transition: {duration: 1, easings: 'easeIn'}},
};

export const showImageHideInstantlyVariants: Variants = {
  hidden: {opacity: 0, transition: {duration: 0}},
  visible: {opacity: 1, transition: {duration: 1, easings: 'easeIn'}},
};

export const dialogueOptionsCinematicVariants: Variants = showImageHideInstantlyVariants;

export const sceneVariants: Variants = {
  hidden: {opacity: 0},
  fadingIn: {
    opacity: 1,
    zIndex: 2,
    transition: {
      duration: 2,
    },
    // to early because we do it in the same time transitionEnd and set nextSceneId to null
    // transitionEnd: {
    //   zIndex: 1,
    // },
  },
  stable: {
    opacity: 1,
    zIndex: 1,
  },
};
