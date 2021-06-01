import React, {CSSProperties} from 'react';
import classNames from 'classnames';
import './styles/PoiStyle.scss';
import {AnimatePresence, motion} from 'framer-motion';
import {useTypedDispatch} from '../redux/store';
import {IVerb} from '../VerbMenu/verbMenuSlice';
import {poiClicked} from '../redux/tempSlice';
import imageCache from '../imageCache';
import variants from '../commons/motion/variants';

type IPoiId = string; // TODO better?
type TImagePath = string;

interface IPoi {
  id: IPoiId,
  style: CSSProperties,
  isDebug?: boolean,
  image?: TImagePath,
  when?: boolean,
  verbs?: IVerb[]
}


const Poi: React.FC<IPoi> = ({
  id,
  isDebug,
  image,
  style,
  when,
  verbs = []
}) => {


  //const isDebug = useSelector(getIsDebug);
  const dispatch = useTypedDispatch();

  // not needed becauuse of initial
  // const [isRendered, setIsRendered] = useState(false);
  // useEffect(() => {
  //   setIsRendered(true);
  // }, []);
  // if (when !== undefined && !when) {
  //   return null;
  // }

  const isShow = when === undefined || when;

  // will throw promise - which works with suspens and suspend component till
  image && imageCache.preload(image);

  const isInteractive = verbs.length > 0;

  const onClick = (e: React.MouseEvent) => {
    const {
      pageX: x,
      pageY: y
    } = e;
    console.log('%c [poi] onClick', 'color: LIGHTSEAGREEN', id, e.pageX);
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
    ...(image && { backgroundImage: `url(${image})`}),
  };

  return (
    <AnimatePresence initial={false}>
      {isShow && (
        <motion.div
          className={classes}
          style={styles}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
        >
          {isInteractive && (
            <div
              className="Poi__hotspot gem-hotspot"
              onClick={onClick}
              // add onToucheEnd?
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

};

export default Poi;
