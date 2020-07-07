import React from 'react';
import classNames from 'classnames';
import './styles/sceneStyle.scss'

interface IActionMenu {

}

// TODO
// add actionMenu layer logic/container component as wrapper
// - with selector and rendering on condition




const ActionMenu: React.FC<IActionMenu> = (props) => {
  const {
    children
  } = props;

  const classes = classNames(
    'ActionMenu'
  );

  const styles = {
  }

  return (
    <div
      className={classes}
      style={styles}
    >
      {children}
    </div>
  );

}

export default ActionMenu;
