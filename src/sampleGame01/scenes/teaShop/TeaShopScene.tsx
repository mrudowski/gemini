import React from 'react';
import sceneImage from './assets/images/teaShop.jpg';
import Scene from '../../../engine/Scene';
// TODO try lazy loading with supsense

const TeaShopScene = () => {
  //const sceneState = useSelector(getSceneState);

  return (
    <Scene
      id="teaShop"
      imagePath={sceneImage}
      // image={''} optional thanks to great default but can be false/null
    >
      {/*<Poi*/}
      {/*  id="tableDirty"*/}
      {/*  style={{*/}
      {/*    top: 100,*/}
      {/*    left: 100,*/}
      {/*    width: 120,*/}
      {/*    height: 80*/}
      {/*    // zIndex: 1*/}
      {/*  }}*/}
      {/*  image={true} /!* true | false | imagePath as string *!/*/}
      {/*  hotspot={{*/}
      {/*    top: 10,*/}
      {/*    left: 10,*/}
      {/*    right: 10,*/}
      {/*    bottom: 10*/}
      {/*  }}*/}
      {/*  when={sceneState.tableDirty && !sceneState.tableDirtyWet}*/}
      {/*  contextMenu={[*/}
      {/*    {*/}
      {/*      labelKey: "look",*/}
      {/*      when: sceneState.tableDirty,*/}
      {/*      script: [*/}
      {/*        actions.look(),*/}
      {/*        actions.talk({text: 'test'})*/}
      {/*      ]*/}
      {/*    },*/}
      {/*    {*/}
      {/*      labelKey: "useWith",*/}
      {/*      script: [*/}
      {/*        actions.useWith([*/}
      {/*          {*/}
      {/*            inventoryItemId: inventory.trayFull.id, // or const inventory_trayFull*/}
      {/*            script: [*/}
      {/*              talk({text: "@tableDirtyUseTrayFull", continueUseWithAction: true}) // preperea talk not execute talk*/}
      {/*            ]*/}
      {/*          },*/}
      {/*          {*/}
      {/*            inventoryItemId: inventory.cloth.id, // ? Cloth as cont*/}
      {/*            script: [*/}
      {/*              action.hideInventory(),*/}
      {/*              action.talk({text: '@tableDirtyUseClothTableWet'}),*/}
      {/*              action.changeState({state: sceneState.tableDirty, value: false}),*/}
      {/*              action.wait({duration: 1500}),*/}
      {/*              action.talk({text: '@thePartIsBroken', actor: actors.gofung, when: sceneState.salammonTea}),*/}
      {/*              action.get({inventoryItemId: inventory.partsBroken, when: sceneState.salammonTea})*/}
      {/*            ]*/}
      {/*          }*/}
      {/*          // [inventory.trayFull.id]: [ ?*/}
      {/*        ])*/}
      {/*      ]*/}
      {/*    }*/}
      {/*  ]}*/}
      {/*/>*/}
    </Scene>
  );

}

export default TeaShopScene;
