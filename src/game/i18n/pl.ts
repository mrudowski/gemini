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
    },
    elmWorkshopByHazel: {
      stairs: {
        examine: "Przejście do mojej pracowni"
      }
    }
  },
  actors: {
    unknown: "???",
    myo: "Mała Wierzba",
    salammon: "Salammon",
    gofungSad: "Smutny Gofung",
    gofungHappy: "Wesoły Gofung",
    salammonUnpleasant: "Niemiły starszy pan",
    salammonAlt: "Staruszek",
    hazel: "Leszczyna"
  },
  talkOptions: {
    myo: "O mnie",
    salammon: "Salammon",
    end: "ZAKOŃCZ"
  },
  talkOptionsAlt: {
    you: "O Tobie",
  }
};

export default pl;
