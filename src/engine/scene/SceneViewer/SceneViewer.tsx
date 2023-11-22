import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useTypedSelector} from '../../redux/store';
import './styles/SceneViewer.scss';
import SceneAnimation from '../SceneAnimation/SceneAnimation';
import {capitalizeFirstLetter} from '../../commons/utils/utils';
import {ISceneId} from '../Scene/types';
import {getCurrentSceneId, getNextSceneId} from '../../redux/tempSliceSelectors';
import GemSuspense from '../../commons/components/GemSuspense/GemSuspense';

// const getScenePathToImport = (sceneId: ISceneId) => `../../game/scenes/${sceneId}/${capitalizeFirstLetter(sceneId)}Scene`;

const capitalizeFirstLetterImportedHereForLazy = capitalizeFirstLetter;

const SceneViewer = () => {
  const currentSceneId = useTypedSelector(getCurrentSceneId);
  const nextSceneId = useTypedSelector(getNextSceneId);

  const [sceneSlots, setSceneSlots] = useState<{sceneSlot1: ISceneId | null; sceneSlot2: ISceneId | null}>(() => ({
    sceneSlot1: null,
    sceneSlot2: null,
  }));
  //const [sceneSlotWithNextSceneId, setSceneSlotWithNextSceneId] = useState<'sceneSlot1' | 'sceneSlot2'>('sceneSlot1');
  const sceneSlotWithCurrentSceneId = useRef<'sceneSlot1' | 'sceneSlot2'>('sceneSlot1');
  const sceneSlotWithNextSceneId = useRef<'sceneSlot1' | 'sceneSlot2'>('sceneSlot2');

  const {sceneSlot1, sceneSlot2} = sceneSlots;

  const [sceneSlot1Ready, setSceneSlot1Ready] = useState(false);
  const [sceneSlot2Ready, setSceneSlot2Ready] = useState(false);

  useEffect(() => {
    if (!sceneSlot1) {
      setSceneSlot1Ready(false);
    }
  }, [sceneSlot1]);

  useEffect(() => {
    if (!sceneSlot2) {
      setSceneSlot2Ready(false);
    }
  }, [sceneSlot2]);

  useEffect(() => {
    // first time
    const slot1 = sceneSlotWithCurrentSceneId.current;
    const slot2 = sceneSlotWithNextSceneId.current;
    setSceneSlots(prevState => ({
      ...prevState, // for typescript
      [slot1]: currentSceneId,
      [slot2]: nextSceneId,
    }));
    if (nextSceneId) {
      sceneSlotWithCurrentSceneId.current = slot2;
      sceneSlotWithNextSceneId.current = slot1;
    }
  }, [currentSceneId, nextSceneId]);

  const SceneSlot1Component = useMemo(() => {
    // why a cannot use getScenePathToImport here?
    return React.lazy(
      () =>
        import(`../../../game/scenes/${sceneSlot1}/${capitalizeFirstLetterImportedHereForLazy(sceneSlot1 || '')}Scene`)
    );
  }, [sceneSlot1]);

  const SceneSlot2Component = useMemo(() => {
    // why a cannot use getScenePathToImport here?
    return React.lazy(
      () =>
        import(`../../../game/scenes/${sceneSlot2}/${capitalizeFirstLetterImportedHereForLazy(sceneSlot2 || '')}Scene`)
    );
  }, [sceneSlot2]);

  return (
    <div className="SceneViewer">
      {sceneSlot1 && (
        <GemSuspense onReady={setSceneSlot1Ready} kind="main">
          <SceneAnimation loaded={sceneSlot1Ready} nextSceneId={sceneSlot1} key="sceneSlot1">
            <SceneSlot1Component />
          </SceneAnimation>
        </GemSuspense>
      )}

      {sceneSlot2 && (
        <GemSuspense onReady={setSceneSlot2Ready} kind="main">
          <SceneAnimation loaded={sceneSlot2Ready} nextSceneId={sceneSlot2} key="sceneSlot2">
            <SceneSlot2Component />
          </SceneAnimation>
        </GemSuspense>
      )}
    </div>
  );
};

export default SceneViewer;
