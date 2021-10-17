/* eslint quotes: ["error", "double", { "allowTemplateLiterals": true }] */

const en = {
  verbs: {
    examine: "Examine",
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
        examine: "Przejście do mojej pracowni [en]"
      }
    }
  },
  actors: {
    unknown: "???",
    myo: "Little Willow",
    salammon: "Salammon",
    gofungSad: "Sad Gofung",
    gofungHappy: "Happy Gofung",
    salammonUnpleasant: "Unpleasant old man",
    salammonAlt: "Old man",
    hazel: "Hazel"
  },
  talkOptions: {
    myo: "About me",
    salammon: "Salammon",
    end: "FINISH"
  },
  talkOptionsAlt: {
    you: "You",
  }
};

export default en;
