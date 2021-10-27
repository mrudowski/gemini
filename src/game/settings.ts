// TODO add type for that
import ACTORS, {IActorId} from './actors';
import SCENES, {ISceneId} from './scenes';
import LANGS, {ILangId} from './languages';

interface ISettings {
  START_FROM_LAST_SCENE: boolean;
  DEFAULT_ACTOR: IActorId;
  PRIMARY_LANG: ILangId;
  FIRST_SCENE: ISceneId;
  // SOUND: true,
  SAVE_GAME_NAME: string;
  TRACKING_ID: string;
}

const SETTINGS: ISettings = {
  START_FROM_LAST_SCENE: false, // set to true when develop
  DEFAULT_ACTOR: ACTORS.hazel,
  PRIMARY_LANG: LANGS.pl,
  FIRST_SCENE: SCENES.elmWorkshopByHazel,
  // SOUND: true,
  SAVE_GAME_NAME: 'tos3Save',
  TRACKING_ID: 'UA-18932217-6',

  // TODO why not part as game level design?
  // mainMenu: {
  //   sounds: [
  //     { soundId: 'musicTheme', volume: 0.1 }
  //   ]
  // },

  // ui: {
  //   mapTrigger: false
  // },

  //initial resources to preload before game start
  // resources: [
  //   'introduction.jpg',
  //
  //   'ui/cursor_arrow.png',
  //   'ui/cursor_arrow_pointer.png',
  //   'ui/leafsBorder.png',
  //   'ui/leafsBorderActive.png',
  //   'ui/oldPaperBg.jpg',
  //   'ui/paperBg.jpg',
  //   'ui/red.png',
  //   'ui/uiTriggers.png',
  //
  //   'mainMenu/background.jpg',
  //   'mainMenu/title.png',
  //   'mainMenu/dot.png',
  //
  //   'map/background.jpg',
  //   'map/teaShop.jpg',
  //   'map/market.jpg',
  //   'map/temple.jpg',
  //   'map/observatory.jpg',
  //
  //   'portraits/aceru.png',
  //   'portraits/adalbert.png',
  //   'portraits/aislin.png',
  //   'portraits/alerig.png',
  //   'portraits/aumur.png',
  //   'portraits/baccataxus.png',
  //   'portraits/balssa.png',
  //   'portraits/birch.png',
  //   'portraits/cryBaby.png',
  //   'portraits/dew.png',
  //   'portraits/dewChild.png',
  //   'portraits/elinwar.png',
  //   'portraits/enora.png',
  //   'portraits/enoraNeck.png',
  //   'portraits/gofung.png',
  //   'portraits/guth.png',
  //   'portraits/juni.png',
  //   'portraits/matilin.png',
  //   'portraits/matiRowan.png',
  //   'portraits/moralba.png',
  //   'portraits/mother.png',
  //   'portraits/myo.png',
  //   'portraits/nuti.png',
  //   'portraits/olwen.png',
  //   'portraits/omorica.png',
  //   'portraits/partner.png',
  //   'portraits/rain.png',
  //   'portraits/redHair.png',
  //   'portraits/rowan.png',
  //   'portraits/rowanMati.png',
  //   'portraits/salammon.png',
  //   'portraits/scath.png',
  //   'portraits/sick.png',
  //   'portraits/stick.png',
  //   'portraits/ticordata.png',
  //   'portraits/ugo.png',
  //   'portraits/voice.png',
  //   'portraits/willow.png',
  //
  //   'inventory/acorns.png',
  //   'inventory/acornMore.png',
  //   'inventory/axe.png',
  //   'inventory/bomb.png',
  //   'inventory/bottle.png',
  //   'inventory/bottleFull.png',
  //   'inventory/bottleFullOfHoney.png',
  //   'inventory/bucket.png',
  //   'inventory/bucketWithWater.png',
  //   'inventory/chronicle.png',
  //   'inventory/cloth.png',
  //   'inventory/clothBlood.png',
  //   'inventory/clothRope.png',
  //   'inventory/clothTable.png',
  //   'inventory/clothTableWet.png',
  //   'inventory/dagger.png',
  //   'inventory/dewSword.png',
  //   'inventory/dreamSummary.png',
  //   'inventory/drug.png',
  //   'inventory/earth.png',
  //   'inventory/flaskBroken.png',
  //   'inventory/honey.png',
  //   'inventory/kettle.png',
  //   'inventory/kettleBoiling.png',
  //   'inventory/kettleWater.png',
  //   'inventory/key.png',
  //   'inventory/kite.png',
  //   'inventory/knife.png',
  //   'inventory/knifeSmall.png',
  //   'inventory/necklace.png',
  //   'inventory/notes.png',
  //   'inventory/partsBroken.png',
  //   'inventory/partsRepaired.png',
  //   'inventory/shovel.png',
  //   'inventory/sword1.png',
  //   'inventory/sword2.png',
  //   'inventory/sword3.png',
  //   'inventory/sword4.png',
  //   'inventory/swordOlwen.png',
  //   'inventory/tableCloth.png',
  //   'inventory/teaBag.png',
  //   'inventory/teaCup.png',
  //   'inventory/teaCupFull.png',
  //   'inventory/teaCupLeaves.png',
  //   'inventory/teaCupWater.png',
  //   'inventory/towel.png',
  //   'inventory/towelDirty.png',
  //   'inventory/tray.png',
  //   'inventory/trayFull.png',
  //   'inventory/wheelbarrow.png',
  //   'inventory/wheelbarrowWithMixture.png',
  // ],
};

export default SETTINGS;
