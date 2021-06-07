import React  from 'react';
import {useSelector} from 'react-redux';
import Scene from '../../../engine/Scene';
import Poi from '../../../engine/Poi';
import POIS from '../../pois';
import SCENES from '../../scenes';
import ACTIONS from '../../../engine/actions';
import T from '../../../engine/translation';
import sceneImage from './assets/images/teaShop.jpg';
// import teaShopImage from './assets/images/dirtyTable.png';
import tableDishesImage from './assets/images/tableDishes.png';
import {getCurrentSceneState} from '../../../engine/redux/worldSlice';
import {ITeaShopSceneState} from './state';
import ACTORS from '../../actors';
import TALK_OPTIONS from '../../talkOptions';

const t = T();

const TeaShopScene = () => {
  const sceneState: ITeaShopSceneState = useSelector(getCurrentSceneState);
  console.log('%c [TeaShopScene]', 'background-color:Orange; color: black', {sceneState});
  const {tableDishesExamineCounter} = sceneState;

  // local variable
  const examineExecutedEvenTimes = tableDishesExamineCounter % 2 === 0;

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
            name: t.verbs.examine,
            when: examineExecutedEvenTimes,
            //when: sceneState.tableIsDirty, // TODO second alt way // show on other example -- for example: exitCity
            script: [
              // no auto guessing when empty text and that's ok
              ACTIONS.talk({text: t.scenes.teaShop.tableDishesExamine}),
              ACTIONS.talk({text: 'second line optional only when we examine second and more times', when: tableDishesExamineCounter > 1}), // TODO give it here real condition
              ACTIONS.talk({text: 'when we click now we will change state and wait 1000 ms'}),
              // actions after (and between) dialog do not close it
              ACTIONS.setCurrentSceneState<ITeaShopSceneState>({
                stateName: 'tableDishesExamineCounter',
                stateValue: tableDishesExamineCounter + 1,
              }),
              ACTIONS.wait(),
              // ACTIONS.talk({text: 'text after 1000 ms wait'}),
            ],
          },
          {
            // example of double use (with when condition) of examine verb
            name: t.verbs.examine,
            when: !examineExecutedEvenTimes,
            script: [
              ACTIONS.talk({text: t.scenes.teaShop.tableDishesExamineAlternative}),
              ACTIONS.talk({text: 'and here we close dialogue by hand and after that we change state and wait 3000 ms'}),
              ACTIONS.endTalk(),
              ACTIONS.setCurrentSceneState<ITeaShopSceneState>({
                stateName: 'tableDishesExamineCounter',
                stateValue: tableDishesExamineCounter + 1
              }),
              ACTIONS.wait({duration: 3}),
              ACTIONS.talk({text: 'and here we open with again'}),
            ]

            // TODO add fine when: thingksomething,
            // no script - testing default script behavior // TODO remove it for our sake
          },
          {
            name: t.verbs.take,
            script: [
              ACTIONS.talk({text: t.scenes.teaShop.tableDishesTake}),
            ]
          },
          {
            name: t.verbs.talk, // TODO? //CUSTOM_VERBS.EXAMINE,
            script: [
              ACTIONS.talk({text: 'testing autoplay 1...', autoPlayAfter: 3}),
              ACTIONS.talk({text: '2...', autoPlayAfter: 1}),
              ACTIONS.talk({text: '3...', autoPlayAfter: 1}),
            ]
          },
          {
            name: t.verbs.talkAlt,
            script: [
              ACTIONS.talkOptions({id: 'talkOptions', actor: 'salammon', options: [
                {id: TALK_OPTIONS.myo},
                {id: TALK_OPTIONS.salammon, next: TALK_OPTIONS.salammon, when: examineExecutedEvenTimes},
                {id: TALK_OPTIONS.end, text: 'Stop talking (custom option text)'},
              ]}),
              ACTIONS.talk({id: TALK_OPTIONS.myo, text: 'Your name is Myo', actor: ACTORS.salammon}),
              ACTIONS.talk({text: 'Correct!', next: 'talkOptions'}),
              ACTIONS.talk({id: TALK_OPTIONS.salammon, text: 'I\'m Salammon', actor: ACTORS.salammon, next: 'talkOptions'}),

              // { stepId: "optionsStep", id: "talkOptions", actor: "salammon", options: [
              //     { text: "talkOptions.myo", next: "myoStep" },
              //     { text: "talkOptions.you", next: "youStep", when: "!afterDeath"},
              //     { text: "talkOptions.teaShop", next: "teaShopStep", when: "!afterDeath"},
              //     { text: "talkOptions.inspection", next: "inspectionStep", when: "@inspectionQuestion && !afterDeath"},
              //     { text: "talkOptions.machine", next: "machineStep", when: "@machineFixing && !dayTwo"},
              //     { text: "talkOptions.shadows", next: "shadowsStep", when: "dayThree"},
              //     { text: "talkOptions.destilation", next: "destilationStep", when: "scenes.teaShop.machineOpen && !scenes.teaShop.machineFixedAgain"},
              //     { text: "talkOptions.fire", next: "fireStep", when: "afterDeath"},
              //     { text: "talkOptions.teaShopStory", next: "teaShopStoryStep", when: "lastDay"},
              //     { text: "talkOptions.dreamSummary", next: "dreamSummaryStep", when: "dreamSummaryBurned && !inventory.dreamSummary"},
              //     { text: "talkOptions.motherIsDew", next: "motherIsDewStep", when: "motherIsDew"},
              //     { text: "talkOptions.end", next: "endHere"}
              //   ]},
            ]
          }
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
    </Scene>
  );

};

export default TeaShopScene;
