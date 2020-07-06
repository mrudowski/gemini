import React, {CSSProperties} from 'react';
import classNames from 'classnames';
import './styles/PoiStyle.scss'
import {IActionObject} from '../actions';

type IPoiId = string; // TODO better?
type TImagePath = string;


interface IActionItem {
  id: string,
  when?: boolean,
  script?: IActionObject[]
}

interface IPoi {
  id: IPoiId,
  image?: TImagePath,
  style: CSSProperties,
  actionMenu: IActionItem[]
}

const Poi: React.FC<IPoi> = (props) => {
  const {
    id,
    image,
    style
  } = props;

  const classes = classNames(
    'Poi',
    `Poi-${id}`
  );

  const styles = {
    ...style,
    backgroundImage: `url(${image})`
  }

  return (
    <div
      className={classes}
      style={styles}
    >
    </div>
  );

}

export default Poi;
