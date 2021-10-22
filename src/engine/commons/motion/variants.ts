export const variants = {
  hidden: {opacity: 0},
  visible: {opacity: 1},
};

export const poiVariants = {
  hidden: {opacity: 0, transition: {duration: 1}},
  visible: {opacity: 1, transition: {duration: 1.5}},
};

export const sceneVariants = {
  hidden: {opacity: 0, zIndex: 2},
  visible: {
    opacity: 1,
    transition: {
      duration: 2,
    },
    transitionEnd: {
      zIndex: 1,
    },
  },
};
