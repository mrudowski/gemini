import React from 'react';
import classNames from 'classnames';
import './styles/VerbItemStyle.scss';
import T from '../translation';

interface IVerbItem {
  id: number,
  name: string,
  onClick: (script: any) => void
}

const t = T();

const VerbItem: React.FC<IVerbItem> = (props) => {
  const {
    id,
    name,
    onClick
  } = props;

  //const {t1} = useTranslation();
  // const t1 = t.current;


  const onHandleClick = () => {
    onClick(id);
  };

  const classes = classNames(
    'VerbItem gem-hotspot',
  );

  return (
    <div
      className={classes}
      onClick={onHandleClick}
    >
      {t.verbs[name] || `[${name}]` /* TODO make a util from it? */}
    </div>
  );
};

export default VerbItem;
