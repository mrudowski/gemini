import React, {CSSProperties} from 'react';
import classNames from 'classnames';
import './styles/PoiStyle.scss'
import {IActionObject} from '../actions';
import {useGemDispatch} from '../redux/store';
import actionSlice, {incrementBy} from '../redux/actionSlice';

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
  //const isDebug = useSelector(getIsDebug);
  const dispatch = useGemDispatch();

  const {
    id,
    image,
    style
  } = props;

  const onClick = (e) => {
    //dispatch({type: 'incrementBy', payload: 10});
    //dispatch(incrementBy(10));
    dispatch(actionSlice.actions.increment());
    //dispatch(showActionMenu());
    //dispatch(poiClicked(e.target));

    console.log('%c [poi] onClick', 'color: LIGHTSEAGREEN', id);
    e.preventDefault();
  }

  const classes = classNames(
    'Poi',
    `Poi-${id}`,
    //isDebug && 'Poi--image'
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
      <div
        className="Poi__hotspot"
        onClick={onClick}
        // add onToucheEnd?
      />
    </div>
  );

}

export default Poi;
