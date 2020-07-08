import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import './styles/styles.scss'
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import Backdrop from '../helpers/Backdrop';
import {closeVerbMenu, getVerbMenuData} from './verbMenuSlice';
import getTopLeftPosition from './utils/getTopLeftPosition';

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

  if (!verbMenuData) return null;

  // --------------------------------------

  const closeMenu = () => {
    dispatch(closeVerbMenu());
  }

  const classes = classNames(
    'VerbMenu',
    {'VerbMenu--show': positionStyle}
  );

  let styles = {
    ...(positionStyle && positionStyle)
  };

  if (verbMenuData) {
    return (
      <>
        <Backdrop onClick={closeMenu} ref={backdropRef} />
        <div
          className={classes}
          style={styles}
          ref={menuRef}
        >
          {verbMenuData.y} / {verbMenuData.x}
        </div>
      </>
    );
  }

  return null;

}

export default VerbMenu;
