import React from 'react';
import classNames from 'classnames';
import './styles/VerbItemStyle.scss'
import {t, useTranslation} from '../translation';

interface IVerbItem {
  id: string,
  onClick: (script) => void
}

const VerbItem: React.FC<IVerbItem> = (props) => {
  const {
    id,
    onClick
  } = props;

  //const {t1} = useTranslation();
  const t1 = t.current;


  const onHandleClick = () => {
    onClick(id);
  }

  const classes = classNames(
    'VerbItem',
  );

  return (
    <div
      className={classes}
      onClick={onHandleClick}
    >
      {t1.verbs.examine}
    </div>
  );
}

export default VerbItem;
