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
      },
      elm: {
        examine: "Odkąd Wiązowi udało się odnaleźć wnuki w ruinach ściółki nieustannie pracuje nad naprawą ściółki. Muszę brać z niego przykład.",
        talk: {
          takeAMoment: "Czy mogłabym zająć ci chwilę?",
          youAlreadyDid: "Już to zrobiłaś.",
          dontBeSoLiteral: "Och, nie bądź taki dosłowny. Jak idą postępy? Nad czym obecnie pracujesz?",
        }
      }
    },
  },
  actors: {
    elm: "Wiąz",
    gofungHappy: "Wesoły Gofung",
    gofungSad: "Smutny Gofung",
    hazel: "Leszczyna",
    myo: "Mała Wierzba",
    salammon: "Salammon",
    salammonAlt: "Staruszek",
    salammonUnpleasant: "Niemiły starszy pan",
    unknown: "???",
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
