import React, {CSSProperties, useEffect} from 'react';
import classNames from 'classnames';
import './styles/PoiStyle.scss';
import {AnimatePresence, motion} from 'framer-motion';
import {useTypedDispatch} from '../redux/store';
import {IVerb} from '../VerbMenu/verbMenuSlice';
import {poiClicked} from '../redux/tempSlice';
import variants from '../commons/motion/variants';
import PreloadImage from '../Preload/PreloadImage';

type IPoiId = string; // TODO better?
type TImagePath = string;

interface IPoi {
  id: IPoiId;
  style: CSSProperties;
  hotspot?: CSSProperties;
  image?: TImagePath;
  when?: boolean;
  verbs?: IVerb[];
}

const Poi: React.FC<IPoi> = ({id, image, style, hotspot, when, verbs = []}) => {
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

  useEffect(() => {
    console.log('%c [mr] POI created', 'background-color:Gold; color: black', id);
  }, [id]);

  const isInteractive = verbs.length > 0;

  const onClick = (e: React.MouseEvent) => {
    const {pageX: x, pageY: y} = e;
    console.log('%c [poi] onClick', 'color: LIGHTSEAGREEN', id, e.pageX);
    if (isInteractive) {
      dispatch(poiClicked({x, y, poiId: id, verbs}));
    }

    e.preventDefault();
  };

  const classes = classNames('Poi', `Poi-${id}`);

  const styles = {
    ...style,
    ...(image && {backgroundImage: `url(${image})`}),
  };

  return (
    <>
      {image && <PreloadImage image={image} />}
      <AnimatePresence initial={false}>
        {isShow && (
          <motion.div className={classes} style={styles} initial="hidden" animate="visible" exit="hidden" variants={variants}>
            {isInteractive && (
              <div
                className="Poi__hotspot gem-hotspot"
                onClick={onClick}
                style={hotspot}
                // add onToucheEnd?
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Poi;
