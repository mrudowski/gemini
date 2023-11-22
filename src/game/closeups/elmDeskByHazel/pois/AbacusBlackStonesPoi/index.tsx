import React from 'react';
import classNames from 'classnames';
import Poi from '../../../../../engine/Poi/Poi';
import SCENE_POIS from '../../scenePois';
import CLOSEUPS from '../../../closeups';
import {useSceneState} from '../../../../../engine/stateHooks/stateHooks';
import styles from './styles.module.scss';

const AbacusBlackStonesPoi = () => {
  const {paramB} = useSceneState(CLOSEUPS.elmDeskByElm);

  return (
    <Poi
      id={SCENE_POIS.abacusBlackStones}
      style={{
        left: 37,
        top: 433,
        width: 360,
        height: 170,
      }}
      className={classNames(styles.blackStones, styles['blackStones--' + paramB])}
    />
  );
};

export default AbacusBlackStonesPoi;
