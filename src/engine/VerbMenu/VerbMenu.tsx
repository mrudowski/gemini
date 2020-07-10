import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {AnimatePresence, motion} from 'framer-motion';
import './styles/VerbMenuStyle.scss'
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import Backdrop from '../helpers/Backdrop';
import {closeVerbMenu, getVerbMenuData, interpretVerb, IVerb} from './verbMenuSlice';
import getTopLeftPosition from './utils/getTopLeftPosition';
import VerbItem from './VerbItem';

interface IVerbMenu {
}

const VerbMenu: React.FC<IVerbMenu> = (props) => {
  // const {
  // } = props;

  const verbMenuData = useTypedSelector(getVerbMenuData);
  const dispatch = useTypedDispatch();
  const [positionStyle, setPositionStyle] = useState<{top: number, left: number} | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  console.log('%c [VerbMenu] render', 'color: DARKKHAKI', verbMenuData, positionStyle);

  // make custom effect from it
  useEffect(() => {
    if (verbMenuData && backdropRef.current && menuRef.current) {
      const viewportRect = backdropRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const topLeftPosition = {
        ...getTopLeftPosition(verbMenuData.x, verbMenuData.y, menuRect, viewportRect)
      }
      setPositionStyle(topLeftPosition);
    } else {
      setPositionStyle(null);
    }

  }, [verbMenuData]);

  // we can't if we want to AnimatePresence to work
  // if (!verbMenuData) return null;

  const closeMenu = () => {
    dispatch(closeVerbMenu());
  }

  const onVerbSelected = (verbId: string) => {
    if (verbMenuData) {
      //dispatch();
      const verb = verbMenuData.verbs.find(verb => verb.id === verbId);
      if (verb) {
        dispatch(interpretVerb(verb));
      } else {
        console.log('%c [onVerbSelected] error - verbDef is not defined', 'background-color:red; color: white', verb);
      }
    }
    closeMenu();
  }

  const classes = classNames(
    'VerbMenu',
    {'VerbMenu--show': positionStyle}
  );

  const styles = {
    ...(positionStyle && positionStyle)
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  // using flatMap
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap#For_adding_and_removing_items_during_a_map
  const getVerbs = (verbs: IVerb[]) =>
    verbs.flatMap(verb => {
      if (verb.when === undefined || verb.when) {
        return [<VerbItem id={verb.id} key={verb.id} onClick={onVerbSelected} />]
      }
      return [];
    });

  return (
    <AnimatePresence>
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
            whileTap={{ scale: 0.95 }}
          >
            {getVerbs(verbMenuData.verbs)}
          </motion.div>
        </>
        )}
    </AnimatePresence>
  );
}

export default VerbMenu;
