import React, {CSSProperties} from 'react';
import classNames from 'classnames';
import './styles/PoiStyle.scss';
import {useTypedDispatch} from '../redux/store';
import {IVerb} from '../VerbMenu/verbMenuSlice';
import {poiClicked} from '../redux/tempSlice';
import imageCache from '../imageCache';

type IPoiId = string; // TODO better?
type TImagePath = string;

interface IPoi {
  id: IPoiId,
  isDebug?: boolean,
  image?: TImagePath,
  style: CSSProperties,
  verbs?: IVerb[]
}

const Poi: React.FC<IPoi> = (props) => {
  //const isDebug = useSelector(getIsDebug);
  const dispatch = useTypedDispatch();

  const {
    id,
    isDebug,
    image,
    style,
    verbs = []
  } = props;

  // will throw promise - which works with suspens and suspend component till
  image && imageCache.preload(image);

  const isInteractive = verbs.length > 0;

  const onClick = (e: React.MouseEvent) => {
    const {
      pageX: x,
      pageY: y
    } = e;
    console.log('%c [poi] onClick', 'color: LIGHTSEAGREEN', id, e.pageX);
    //dispatch({type: 'incrementBy', payload: 10});
    //dispatch(incrementBy(10));
    //dispatch(actionSlice.actions.increment());
    //dispatch(showVerbMenu(e.pageX, e.pageY, VerbMenu));
    //dispatch(poiClicked({x, y, verbs}));
    if (isInteractive) {
      dispatch(poiClicked({x, y, poiId: id, verbs}));
    }

    e.preventDefault();
  };

  const classes = classNames(
    'Poi',
    `Poi-${id}`,
    isDebug && 'Poi--debug'
  );

  const styles = {
    ...style,
    backgroundImage: `url(${image})`
  };

  return (
    <div
      className={classes}
      style={styles}
    >
      {isInteractive &&
        <div
          className="Poi__hotspot gem-hotspot"
          onClick={onClick}
          // add onToucheEnd?
        />
      }
    </div>
  );

};

export default Poi;
