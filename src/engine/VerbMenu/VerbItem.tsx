import React from 'react';
import classNames from 'classnames';
import './styles/VerbItemStyle.scss';

interface IVerbItem {
  id: number,
  name: string,
  onClick: (script: any) => void
}

const VerbItem: React.FC<IVerbItem> = (props) => {
  const {
    id,
    name,
    onClick
  } = props;

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
      {name}
    </div>
  );
};

export default VerbItem;
