import React, {CSSProperties} from 'react';
import classNames from 'classnames';
import './styles/PoiStyle.scss'
import {IActionObject} from '../actions';
import {useGemDispatch} from '../redux/store';
import actionSlice, {incrementBy, poiClicked} from '../redux/actionSlice';

type IPoiId = string; // TODO better?
type TImagePath = string;


interface IActionItem {
  id: string,
  when?: boolean,
  script?: IActionObject[]
}

export type TActionMenu = IActionItem[];

interface IPoi {
  id: IPoiId,
  image?: TImagePath,
  style: CSSProperties,
  actionMenu: TActionMenu
}

const Poi: React.FC<IPoi> = (props) => {
  //const isDebug = useSelector(getIsDebug);
  const dispatch = useGemDispatch();

  const {
    id,
    image,
    style,
    actionMenu
  } = props;

  const onClick = (e: React.MouseEvent) => {
    const {
      pageX: x,
      pageY: y
    } = e;
    console.log('%c [poi] onClick', 'color: LIGHTSEAGREEN', id, e.pageX);
    //dispatch({type: 'incrementBy', payload: 10});
    //dispatch(incrementBy(10));
    //dispatch(actionSlice.actions.increment());
    //dispatch(showActionMenu(e.pageX, e.pageY, actionMenu));
    dispatch(poiClicked({x, y, actionMenu}));

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
