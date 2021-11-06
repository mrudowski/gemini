/* eslint quotes: ["error", "double", { "allowTemplateLiterals": true }] */

import pl from "./pl";

const en: typeof pl = {
  verbs: {
    examine: "Examine",
    go: "Go",
    take: "Take",
    talk: "Talk",
    talkAlt: "Small talk",
  },
  scenes: {
    teaShop: {
      tableDishesExamine: "The table is dirty, it needs wiping. I'll just clear the cups and plates off it, first.",
      tableDishesExamineAlternative: "Still dirty",
      tableDishesTake: "Just like that? There's too many of these, I need a tray.",
    },
    elmWorkshopByHazel: {
      stairs: {
        examine: "Przejście do mojej pracowni. [en]"
      },
      elm: {
        examine: "Odkąd Wiązowi udało się odnaleźć wnuki w ruinach ściółki nieustannie pracuje nad naprawą ściółki. Muszę brać z niego przykład. [en]",
        talk: {
          takeAMoment: "Czy mogłabym zająć ci chwilę? [en]",
          youAlreadyDid: "Już to zrobiłaś. [en]",
          dontBeSoLiteral: "Och, nie bądź taki dosłowny. Jak idą postępy? Nad czym obecnie pracujesz? [en]",
          howIsYourWork: "Jeśli harmonia ma na powrót zagościć do świata, muszą nakreślone zostać reguły, czyniące go przewidywalnym. To trudne zadanie. Wiele się zmieniło odkąd go stworzyliśmy. A jak twoja praca? [en]",
          notTooEasy: "Również nie łatwa. Mam wrażenie, że rozwiązanie jest tuż tuż, ale wciąż mi umyka. Możemy porozmawiać? Mam wrażenie że obojgu nam się to przyda. [en]",
          canWeTalk: "Możemy porozmawiać? [en]",
          discoveryOfTheGrandchildren: "[en]",
          discoveryOfTheGrandchildrenAnswer: "[en]",
          elmWork: "Jak idzie twoja praca? Może mogłabym ci pomóc?",
          elmWorkAnswer: "Sam muszę zrozumieć, co właściwie próbuję osiągnąć. Ale dziękuję za propozycję. Będę pamiętał.",
        }
      }
    }
  },
  actors: {
    elm: "Elm",
    gofungHappy: "Happy Gofung",
    gofungSad: "Sad Gofung",
    hazel: "Hazel",
    myo: "Little Willow",
    salammon: "Salammon",
    salammonAlt: "Old man",
    salammonUnpleasant: "Unpleasant old man",
    unknown: "???",
  },
  talkOptions: {
    discoveryOfTheGrandchildren: "Odkrycie Wnuków [en]",
    elmWork: "Praca Wiąza [en]",
    myo: "About me",
    salammon: "Salammon",
    end: "FINISH",
    endFirstTalk: "FINISH"
  },
  talkOptionsAlt: {
    you: "You",
  }
};

export default en;
