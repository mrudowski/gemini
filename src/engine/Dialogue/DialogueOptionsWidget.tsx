import React from 'react';
import classNames from 'classnames';
import {ITalkOptionsActionPayload} from '../actions';
import './styles/DialogueOptionsWidgetStyle.scss';
import {useTypedSelector} from '../redux/store';
import {getActors} from '../redux/worldSlice';
import {getCurrentPoiId} from '../redux/tempSlice';

interface IDialogueOptions {
  options: ITalkOptionsActionPayload['options']
}

const DialogueOptionsWidget: React.FC<IDialogueOptions> = ({
  options
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
            <div className={optionClasses}>
              {/*<span className="check">[<i>x</i>]</span>*/}
              <span className="text">{option.id} {option.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DialogueOptionsWidget;
