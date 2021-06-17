import React from 'react';
import classNames from 'classnames';
import {ITalkOptionsActionPayload} from '../actions';
import './styles/DialogueOptionsWidgetStyle.scss';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {getActorState, markActorTalkOptionAsAsked} from '../redux/worldSlice';
import {IActorId} from '../../game/actors';

interface IDialogueOptions {
  options: ITalkOptionsActionPayload['options'],
  onOptionSelect: (e, next: string) => void,
  actorId: IActorId
}

const DialogueOptionsWidget: React.FC<IDialogueOptions> = ({
  options,
  onOptionSelect,
  actorId
}) => {

  const dispatch = useTypedDispatch();

  const actorTalkOptions = useTypedSelector(getActorState(actorId));
  // alt alternative
  // const talkOptionsState = useTypedSelector(getTalkOptions);

  const classes = classNames(
    'DialogueOptionsWidget',
    'DialogueOptionsWidget--short'
  );

  // TODO multiline


  return (
    <div
      className={classes}
    >
      {options.filter(option => option.when !== false).map(option => {
        let isAsked = false;
        if (option.id !== 'end') {
          isAsked = actorTalkOptions[option.id];
        }
        const optionClasses = classNames(
          'option gem-hotspot',
          isAsked && 'asked',
          // multiline
        );
        return (
          <div key={option.id}>
            <div className={optionClasses} onClick={(e) => {
              dispatch(markActorTalkOptionAsAsked({actorId, optionId: option.id}));
              onOptionSelect(e, option.next || option.id);
            }}>
              {/*<span className="check">[<i>x</i>]</span>*/}
              <span className="text">{option.text || option.id}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DialogueOptionsWidget;
