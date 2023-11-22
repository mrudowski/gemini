import React, {CSSProperties, ReactNode} from 'react';
import classNames from 'classnames';
import './styles/PoiStyle.scss';
import {AnimatePresence, motion} from 'framer-motion';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {IVerb} from '../VerbMenu/verbMenuSlice';
import {poiClicked} from '../redux/tempSlice';
import PreloadImage from '../Preload/PreloadImage';
import {poiVariants} from '../commons/motion/variants';
import PoiHelper from './components/PoiHelper/PoiHelper';
import {resolveWhen} from '../commons/utils/utils';
import {TImagePath} from '../commons/types/types';
import {getIsShowHiddenPoiActive} from '../DevTools/devToolsSlice';
import {getShowPois} from '../redux/tempSliceSelectors';

type IPoiId = string; // TODO better?

interface IPoi {
  id: IPoiId;
  style: CSSProperties;
  className?: string;
  hotspot?: CSSProperties;
  image?: TImagePath;
  /**
   * all additionally images which we should preload before showing them under certain conditions
   */
  imagesToPreload?: TImagePath[];
  /**
   * additionally images to show (usually depending on state)
   */
  imagesToShow?: TImagePath[];
  when?: boolean;
  verbs?: IVerb[];
  children?: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const Poi: React.FC<IPoi> = ({
  id,
  image,
  style,
  className,
  hotspot,
  when,
  verbs = [],
  imagesToShow,
  imagesToPreload,
  children,
  onClick,
}) => {
  const showHelper = useTypedSelector(getShowPois);
  const isShowHiddenPoiActive = useTypedSelector(getIsShowHiddenPoiActive);
  const dispatch = useTypedDispatch();

  const isShow = resolveWhen(when);

  // useEffect(() => {
  //   console.log('%c [mr] POI created', 'background-color:Gold; color: black', id);
  // }, [id]);

  const hasVerbs = verbs ? verbs.filter(verb => verb.when !== false).length > 0 : false;
  const isInteractive = onClick || hasVerbs;

  const onClickProxy = (e: React.MouseEvent) => {
    const {pageX: x, pageY: y} = e;
    // console.log('%c [poi] onClick', 'background-color:black; color: LIGHTSEAGREEN', id, e.pageX);
    if (isInteractive && hasVerbs) {
      dispatch(poiClicked({x, y, poiId: id, verbs}));
    }

    if (isInteractive && onClick) {
      onClick(e);
    }

    e.preventDefault();
  };

  const classes = classNames('Poi', `Poi-${id}`, isShowHiddenPoiActive && !isShow && 'Poi--debug--hidden', className);

  const styles = {
    ...style,
    ...(image && {backgroundImage: `url(${image})`}),
  };

  return (
    <>
      {image && <PreloadImage image={image} />}
      {imagesToPreload &&
        imagesToPreload.map(imageToPreload => <PreloadImage key={imageToPreload} image={imageToPreload} />)}
      <AnimatePresence initial={false}>
        {(isShowHiddenPoiActive || isShow) && (
          <motion.div
            className={classes}
            style={styles}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={poiVariants}
          >
            {children}
            {isInteractive && (
              <div
                className="Poi__hotspot gem-hotspot"
                onClick={onClickProxy}
                style={hotspot}
                // add onToucheEnd?
              >
                <AnimatePresence>{showHelper && <PoiHelper />}</AnimatePresence>
              </div>
            )}
            <AnimatePresence initial={false}>
              {imagesToShow &&
                imagesToShow.map((imageToShow, index) => {
                  const imageToShowStyle = {
                    backgroundImage: `url(${imageToShow})`,
                  };
                  return (
                    <motion.div
                      key={imageToShow}
                      className={classNames('Poi__imageToShow', `Poi__imageToShow--${index}`)}
                      style={imageToShowStyle}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={poiVariants}
                    />
                  );
                })}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Poi;
