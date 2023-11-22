import React, {useMemo} from 'react';
import './styles/CloseupScene.scss';
import {capitalizeFirstLetter} from '../../../../commons/utils/utils';

interface ICloseupScene {
  sceneId;
}

const capitalizeFirstLetterImportedHereForLazy = capitalizeFirstLetter;

const CloseupScene: React.FC<ICloseupScene> = ({sceneId}) => {
  const SceneComponent = useMemo(() => {
    return React.lazy(
      () =>
        import(
          `../../../../../game/closeups/${sceneId}/${capitalizeFirstLetterImportedHereForLazy(sceneId || '')}Scene`
        )
    );
  }, [sceneId]);

  return <SceneComponent />;
};

export default CloseupScene;
