/* eslint quotes: ["error", "double", { "allowTemplateLiterals": true }] */

const pl = {
  verbs: {
    examine: "Zbadaj",
    go: "Idź",
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
          howIsYourWork: "Jeśli harmonia ma na powrót zagościć do świata, muszą nakreślone zostać reguły, czyniące go przewidywalnym. To trudne zadanie. Wiele się zmieniło odkąd go stworzyliśmy. A jak twoja praca?",
          notTooEasy: "Również nie łatwa. Mam wrażenie, że rozwiązanie jest tuż tuż, ale wciąż mi umyka. Możemy porozmawiać? Mam wrażenie że obojgu nam się to przyda.",
          canWeTalk: "Możemy porozmawiać?",
          discoveryOfTheGrandchildren: "Opowiesz mi raz jeszcze, jak odnalazłeś nasze dzieci?",
          discoveryOfTheGrandchildrenAnswer: "Oczywiście. Kiedy przemierzałem ściółkę w bezwiednej wędrówce, napotkałem  miejsce, które wydarło mój umysł z letargu. Na zgliszczach zniszczonego przez wojnę świata, nasze dzieci zbudowały osady. Ich życie, choć okupione wielkim bólem i strachem, toczyło się dalej. Uczyły się i rozwijały, powoli ujarzmiając zniszczone wojną ziemie Ściółki. Zrozumiałem wówczas, iż nie wszystko stracone, a nasz Sen o szczęśliwym ogrodzie u podnóża Dębu może jeszcze się ziścić. Powróciłem do Korony i oznajmiłem wam wieści.",
          elmWork: "Jak idzie twoja praca? Może mogłabym ci pomóc?",
          elmWorkAnswer: "Sam muszę zrozumieć, co właściwie próbuję osiągnąć. Ale dziękuję za propozycję. Będę pamiętał.",
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
    discoveryOfTheGrandchildren: "Odkrycie Wnuków",
    elmWork: "Praca Wiąza",
    myo: "O mnie",
    salammon: "Salammon",
    end: "ZAKOŃCZ",
    endFirstTalk: "ZAKOŃCZ"
  },
  talkOptionsAlt: {
    you: "O Tobie",
  }
};

export default pl;
