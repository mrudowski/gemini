import React from 'react';
import classNames from 'classnames';
import './styles/sceneStyle.scss'

interface IActionMenu {

}

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
