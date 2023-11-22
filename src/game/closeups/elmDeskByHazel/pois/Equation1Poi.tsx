import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useTranslation} from '../../../../engine/translation';
import SCENE_POIS from '../scenePois';

const Equation1Poi = () => {
  const t = useTranslation();

  return (
    <Poi
      id={SCENE_POIS.equation1}
      style={{
        left: 202 - 128,
        top: 132 - 70,
        width: 290,
        height: 124,
      }}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.elmDeskByHazel.equation1.examine})],
        },
      ]}
    />
  );
};

export default Equation1Poi;
