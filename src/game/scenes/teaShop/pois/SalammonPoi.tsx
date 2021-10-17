import React from 'react';
import {useSelector} from 'react-redux';
import Poi from '../../../../engine/Poi';
import ACTIONS from '../../../../engine/actions';
import T from '../../../../engine/translation';
import salammon from '../assets/images/salammon.png';
import {getActorState, getCurrentSceneState} from '../../../../engine/redux/worldSlice';
import {ITeaShopSceneState} from '../state';
import ACTORS from '../../../actors';
import TALK_OPTIONS from '../../../talkOptions';

const t = T();

const SalammonPoi = () => {
  const sceneState = useSelector(getCurrentSceneState) as ITeaShopSceneState;
  const salammonState = useSelector(getActorState(ACTORS.salammon));
  const {tableDishesExamineCounter} = sceneState;

  // local variable
  const examineExecutedEvenTimes = tableDishesExamineCounter % 2 === 0;

  const getGofungName = () => {
    if (salammonState.salammon) {
      return t.actors.gofungSad;
    }
    return t.actors.gofungHappy;
  };

  return (
    <Poi
      id={ACTORS.salammon}
      style={{
        left: 356,
        top: 171,
        width: 83,
        height: 105
      }}
      image={salammon}
      hotspot={{
        clipPath: 'polygon(62% 4%, 86% 42%, 75% 95%, 16% 79%, 13% 58%, 39% 4%)'
      }}
      verbs={[
        {
          name: t.verbs.talk,
          script: [
            ACTIONS.talk({text: 'Hmm?', actor: ACTORS.salammon}),
            ACTIONS.talk({text: 'Be careful with this old man :)', actor: ACTORS.gofung, actorName: getGofungName()}),
            ACTIONS.talkOptions({id: 'talkOptions', actor: ACTORS.salammon, options: [
              {id: TALK_OPTIONS.myo},
              {id: TALK_OPTIONS.salammon, text: t.talkOptionsAlt.you,  next: 'someCustomId', when: examineExecutedEvenTimes},
              {id: TALK_OPTIONS.end, text: 'Stop talking (custom option text)'},
            ]}),
            ACTIONS.talk({id: TALK_OPTIONS.myo, text: 'Your name is Myo', actor: ACTORS.salammon}),
            ACTIONS.talk({text: 'Correct!', next: 'talkOptions'}),
            ACTIONS.talk({id: 'someCustomId', text: 'I\'m Salammon', actor: ACTORS.salammon, next: 'talkOptions'}),
          ]
        }
      ]}
    />
  );

};

export default SalammonPoi;
