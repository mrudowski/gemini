import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {AnimatePresence, motion} from 'framer-motion';
import {useHotkeys} from 'react-hotkeys-hook';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import Backdrop from '../commons/components/Backdrop';
import {closeVerbMenu, interpretVerb, IVerb} from './verbMenuSlice';
import getTopLeftPosition from './utils/getTopLeftPosition';
import VerbItem from './VerbItem';
import {variants} from '../commons/motion/variants';
import {resolveWhen} from '../commons/utils/utils';
import './styles/VerbMenuStyle.scss';
import {getVerbMenuData} from './verbMenuSelectors';

interface IVerbMenu {}

const VerbMenu: React.FC<IVerbMenu> = () => {
  // const {
  // } = props;

  const verbMenuData = useTypedSelector(getVerbMenuData);
  const dispatch = useTypedDispatch();
  const [positionStyle, setPositionStyle] = useState<{top: number; left: number} | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // console.log('%c [VerbMenu] render', 'color: DARKKHAKI', verbMenuData, positionStyle);

  // make custom effect from it
  useEffect(() => {
    if (verbMenuData && backdropRef.current && menuRef.current) {
      const viewportRect = backdropRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const topLeftPosition = {
        ...getTopLeftPosition(verbMenuData.x, verbMenuData.y, menuRect, viewportRect),
      };
      setPositionStyle(topLeftPosition);
    } else {
      setPositionStyle(null);
    }
  }, [verbMenuData]);

  // we can't if we want to AnimatePresence to work
  // if (!verbMenuData) return null;

  const closeMenu = () => {
    dispatch(closeVerbMenu());
  };

  useHotkeys(
    'esc',
    () => {
      // method because useHotKeys have second hotkeysEvent param
      closeMenu();
    },
    {
      enabled: !!verbMenuData,
    }
  );

  const onVerbSelected = (verbIndex: number) => {
    if (verbMenuData) {
      //dispatch();
      const selectedVerb = verbMenuData.verbs[verbIndex];
      if (selectedVerb) {
        dispatch(interpretVerb(selectedVerb));
      } else {
        console.log(
          '%c [onVerbSelected] error - verbDef is not defined',
          'background-color:red; color: white',
          selectedVerb
        );
      }
    }
    closeMenu();
  };

  const classes = classNames('VerbMenu', {'VerbMenu--show': positionStyle});

  const styles = {
    ...(positionStyle && positionStyle),
  };

  // using flatMap
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap#For_adding_and_removing_items_during_a_map
  const getVerbs = (verbs: IVerb[]) =>
    verbs.flatMap((verb, index) => {
      if (resolveWhen(verb.when)) {
        // index as id because we can have many `examine` verbs (hidden by `when` condition)
        return [<VerbItem id={index} key={verb.name} name={verb.name} onClick={onVerbSelected} />];
      }
      return [];
    });

  const onExitComplete = () => {
    // TODO
  };

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {verbMenuData && (
        <>
          <Backdrop onClick={closeMenu} ref={backdropRef} />
          <motion.div
            className={classes}
            style={styles}
            ref={menuRef}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            whileTap={{scale: 0.95}}
          >
            <div className="VerbMenu__border" />
            <div>{getVerbs(verbMenuData.verbs)}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VerbMenu;
