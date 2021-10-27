export const variants = {
  hidden: {opacity: 0},
  visible: {opacity: 1},
};

export const poiVariants = {
  hidden: {opacity: 0, transition: {duration: 1}},
  visible: {opacity: 1, transition: {duration: 1.5}},
};

export const sceneVariants = {
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
