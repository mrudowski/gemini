import React, {useState} from 'react';
import classNames from 'classnames';
import './styles/DialogueOptionsWidgetStyle.scss';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {getActorState, markActorTalkOptionAsAsked} from '../World/worldSlice';
import {useTranslation} from '../translation';
import {IActorId} from './types';
import {ITalkOptionsActionPayload} from '../actions/talk/talk';
import {checkDynamicCondition, checkIfAsked} from './utils/checkDynamicCondition';
import {END} from '../actions/constants';

interface IDialogueOptions {
  options: ITalkOptionsActionPayload['options'];
  onOptionSelect: (e, next: string) => void;
  actorId: IActorId;
  layout: ITalkOptionsActionPayload['layout'];
}

const DialogueOptionsWidget: React.FC<IDialogueOptions> = ({
  options,
  onOptionSelect,
  actorId,
  layout = 'short',
}: IDialogueOptions) => {
  const dispatch = useTypedDispatch();
  const t = useTranslation();
  // a way to not animate whenAsked on our eyes (in cinematic mode)
  const [hidden, hide] = useState(false);

  const actorTalkOptions = useTypedSelector(state => getActorState(state, actorId));
  // alt alternative
  // const talkOptionsState = useTypedSelector(getTalkOptions);

  const classes = classNames(
    'DialogueOptionsWidget',
    `DialogueOptionsWidget--${layout}`,
    hidden && 'DialogueOptionsWidget--hidden'
  );

  return (
    <div className={classes}>
      {options
        .filter(
          option =>
            option.when !== false &&
            checkIfAsked({actorTalkOptions, optionId: option.whenAsked}) &&
            checkDynamicCondition(option?.dynamicWhen)
        )
        .map(option => {
          let isAsked = false;
          if (option.id !== END) {
            isAsked = actorTalkOptions[option.id];
          }
          const optionClasses = classNames('option gem-hotspot', isAsked && 'asked');
          return (
            <div
              key={option.id}
              {...(layout === 'cinematic' && {
                className: 'optionWrapper shake-constant shake-constant--hover shake-cinematicOption',
                style: {
                  animationDelay: Math.random() + 's',
                  ...option.style,
                },
              })}
            >
              <div
                className={optionClasses}
                onClick={e => {
                  dispatch(markActorTalkOptionAsAsked({actorId, optionId: option.id}));
                  onOptionSelect(e, option.next || option.id);
                  if (layout === 'cinematic') {
                    hide(true);
                  }
                }}
              >
                {/*<span className="check">[<i>x</i>]</span>*/}
                <span className="text">{option.text || t.talkOptions[option.id]}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DialogueOptionsWidget;
