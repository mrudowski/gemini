import React from 'react';
import classNames from 'classnames';
import {ITalkOptionsActionPayload} from '../actions';
import './styles/DialogueOptionsWidgetStyle.scss';
import {useTypedSelector} from '../redux/store';
import {getActors} from '../redux/worldSlice';

interface IDialogueOptions {
  options: ITalkOptionsActionPayload['options'],
  onOptionSelect: (e, next: string) => void
}

const DialogueOptionsWidget: React.FC<IDialogueOptions> = ({
  options,
  onOptionSelect
}) => {


  // TODO get currentPOI/actor! ---> getCurrentActor
  // TODO talkOptions with actors[] --- would be better -- meybe not
  //const poiId = getCurrentPoiId(state);
  const actors = useTypedSelector(getActors);

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
        const isAsked = option.id;
        const optionClasses = classNames(
          'option gem-hotspot',
          isAsked && 'asked',
          // multiline
        );
        return (
          <div key={option.id}>
            <div className={optionClasses} onClick={(e) => {
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
