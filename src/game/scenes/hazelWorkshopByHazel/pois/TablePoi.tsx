import React from 'react';
import Poi from '../../../../engine/Poi';
import SCENE_POIS from '../scenePois';
import ACTIONS from '../../../../engine/actions';
import {useTranslation} from '../../../../engine/translation';
import SCENES from '../../../scenes';

const TablePoi = () => {
  const t = useTranslation();

  return (
    <Poi
      id={SCENE_POIS.table}
      style={{
        left: 264,
        top: 453,
        width: 394,
        height: 207,
      }}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.hazelWorkshopByHazel.table.examine})],
        },
        {
          name: t.verbs.lookCloser,
          script: [ACTIONS.lookCloser({scene: SCENES.hazelTableByHazel})],
        },
      ]}
    />
  );
};

export default TablePoi;
