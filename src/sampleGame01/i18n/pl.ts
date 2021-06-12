/* eslint quotes: ["error", "double", { "allowTemplateLiterals": true }] */

import en from "./en";

const pl: typeof en = {
  verbs: {
    examine: "Zbadaj",
    take: "Weź",
    talk: "Porozmawiaj",
    talkAlt: "Pogawędka",
  },
  scenes: {
    teaShop: {
      tableDishesExamine: "Stolik jest brudny, muszę go wytrzeć. Tylko najpierw sprzątnę naczynia.",
      tableDishesExamineAlternative: "Wciąż brudny",
      tableDishesTake: "W rękach? Za dużo ich, lepiej wezmę tacę.",
    }
  },
  actors: {
    unknown: "???",
    myo: "Mała Wierzba",
    salammon: "Salammon",
    salammonAlt: "Staruszek",
  },
  talkOptions: {
    myo: "O mnie",
    salammon: "Salammon",
    end: "ZAKOŃCZ"
  }
};

export default pl;
