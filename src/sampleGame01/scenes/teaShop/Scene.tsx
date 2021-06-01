import React  from 'react';
import {useSelector} from 'react-redux';
import Scene from '../../../engine/Scene';
import Poi from '../../../engine/Poi';
import VERBS from '../../../engine/VerbMenu/verbs';
import POIS from '../../pois';
import SCENES from '../../scenes';
import ACTIONS from '../../../engine/actions';
import T from '../../../engine/translation';
import sceneImage from './assets/images/teaShop.jpg';
// import teaShopImage from './assets/images/dirtyTable.png';
import tableDishesImage from './assets/images/tableDishes.png';
import {getCurrentSceneState} from '../../../engine/redux/worldSlice';
import {ITeaShopSceneState} from './state';

const t = T();

const TeaShopScene = () => {
  const sceneState: ITeaShopSceneState = useSelector(getCurrentSceneState);
  console.log('%c [TeaShopScene]', 'background-color:Orange; color: black', {sceneState});
  const {tableDishesExamineCounter} = sceneState;

  return (
    <Scene
      id={SCENES.teaShop}
      // TODO imagePath is wrong - should be image - or fix it
      imagePath={sceneImage}
      // image={''} optional thanks to great default but can be false/null
    >
      { /*
      <Poi
        id={POIS.dirtyTable}
        image={teaShopImage}
        style={{
          top: 279,
          left: 146,
          width: 112,
          height: 78
        }}
        // TODO when={sceneState.tableIsDirty}
        // TODO why not actions? Because verbs is group of atomic actions? - ok
        verbs={[
          {
            id: VERBS.EXAMINE,
            when: false,
            //when: sceneState.tableIsDirty, // TODO second alt way // show on other example -- for example: exitCity
            script: [
              // no auto guessing when empty text and that's ok
              ACTIONS.talk({text: t.scenes.teaShop.dirtyTableExamine}),
              ACTIONS.talk({text: 'second line optional', when: false}), // TODO give it here real condition
              ACTIONS.talk({text: 'third line'}),
            ]
          },
          {
            id: VERBS.EXAMINE,
            // TODO add fine when: thingksomething,
            // no script - testing default script behavior // TODO remove it for our sake
          },
          {
            id: 'test', //CUSTOM_VERBS.EXAMINE,
            script: [
              ACTIONS.talk({text: 'test line'}),
            ]
          },
        ]}
      />
      */ }

      <Poi
        id={POIS.tableDishes}
        image={tableDishesImage}
        style={{
          left: 152,
          top: 285,
          width: 112,
          height: 78
        }}
        // when={!@tableDishesTaken && !@elinwarTeaShop}
        // TODO when={sceneState.tableIsDirty}
        // TODO why not actions? Because verbs is group of atomic actions? - ok
        verbs={[
          {
            name: VERBS.EXAMINE,
            when: (tableDishesExamineCounter % 2 === 0),
            //when: false,
            //when: sceneState.tableIsDirty, // TODO second alt way // show on other example -- for example: exitCity
            script: [
              // no auto guessing when empty text and that's ok
              ACTIONS.talk({text: t.scenes.teaShop.tableDishesExamine}),
              ACTIONS.talk({text: 'second line optional', when: false}), // TODO give it here real condition
              ACTIONS.talk({text: 'third line'}),
              // TODO how to typized it?
              // TODO it shouldn't break (close) the dialog!
              ACTIONS.setCurrentSceneState<ITeaShopSceneState>({
                stateName: 'tableDishesExamineCounter',
                stateValue: tableDishesExamineCounter + 1,
              })
            ]
          },
          {
            // example of double use (with when condition) of examine verb
            name: VERBS.EXAMINE,
            // TODO add some local condition -- move it higher as var - as example
            //  and use it in above as well only with negation !
            when: (tableDishesExamineCounter % 2 !== 0),
            script: [
              ACTIONS.talk({text: t.scenes.teaShop.tableDishesExamineAlternative}),
              ACTIONS.setCurrentSceneState<ITeaShopSceneState>({
                stateName: 'tableDishesExamineCounter',
                stateValue: tableDishesExamineCounter + 1
              })
            ]

            // TODO add fine when: thingksomething,
            // no script - testing default script behavior // TODO remove it for our sake
          },
          {
            name: VERBS.TAKE,
            // no script - testing default script behavior // TODO is it worth it?
            // TODO is not - and we have to guess/remember translation key name
            // as alt:
            // script: [
            //   ACTIONS.talk({text: t.scenes.teaShop.tableDishesTake}),
            // ]
          },
          {
            name: 'test', // TODO? //CUSTOM_VERBS.EXAMINE,
            script: [
              ACTIONS.talk({text: 'test line'}),
            ]
          },
        ]}
      />

      <Poi
        id="test"
        style={{
          left: 10,
          top: 10,
          width: 100,
          height: 100
        }}
        when={tableDishesExamineCounter % 2 === 0}
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
