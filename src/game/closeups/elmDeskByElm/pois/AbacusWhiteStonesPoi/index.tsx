import React from 'react';
import classNames from 'classnames';
import Poi from '../../../../../engine/Poi/Poi';
import SCENE_POIS from '../../scenePois';
import CLOSEUPS from '../../../closeups';
import {useSceneState} from '../../../../../engine/stateHooks/stateHooks';
import styles from './styles.module.scss';

const AbacusWhiteStonesPoi = () => {
  const {paramA} = useSceneState(CLOSEUPS.elmDeskByElm);

  return (
    <Poi
      id={SCENE_POIS.abacusWhiteStones}
      style={{
        left: 55,
        top: 298,
        width: 360,
        height: 170,
      }}
      className={classNames(styles.whiteStones, styles['whiteStones--' + paramA])}
    />
  );
};

export default AbacusWhiteStonesPoi;
