import React from 'react';
import Scene from '../../../engine/Scene';
import Poi from '../../../engine/Poi';
import VERBS from '../../../engine/VerbMenu/verbs';
import POIS from '../../pois';
import SCENES from '../../scenes';
import ACTIONS from '../../../engine/actions';
import T from '../../../engine/translation';
import sceneImage from './assets/images/teaShop.jpg';
import teaShopImage from './assets/images/tableDirty.png';

const TeaShopScene = () => {
  //const sceneState = useSelector(getSceneState);

  return (
    <Scene
      id={SCENES.teaShop}
      imagePath={sceneImage}
      // image={''} optional thanks to great default but can be false/null
    >
      <Poi
        id={POIS.tableDirty}
        image={teaShopImage}
        style={{
          top: 279,
          left: 146,
          width: 112,
          height: 78
        }}
        verbs={[
          {
            id: VERBS.examine,
            //when: sceneState.tableDirty,
            script: [
              ACTIONS.talk({text: T().scenes.teaShop.tableDirtyExamine}),
              ACTIONS.talk({text: 'second line optional', when: false}),
              ACTIONS.talk({text: 'second line'}),
            ]
            // short default
            // id: VERBS.examine,
          },
        ]}
      />


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

};

export default TeaShopScene;
