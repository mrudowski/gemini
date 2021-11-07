import React, {Suspense, useEffect, useMemo, useRef, useState} from 'react';
import {ISceneId} from '../../game/scenes';
import {useTypedSelector} from '../redux/store';
import {getCurrentSceneId} from '../redux/gemSlice';
import {getNextSceneId} from '../redux/tempSlice';
import './styles/SceneViewer.scss';
import SceneAnimation from '../SceneAnimation/SceneAnimation';
import Spinner from '../components/Spinner/Spinner';
import {capitalizeFirstLetter} from '../utils/utils';

const SceneLoading = ({onReady}) => {
  useEffect(() => {
    onReady(false);
    return () => {
      onReady(true);
    };
  }, [onReady]);
  return (
    <div className="SceneViewerLoader">
      <Spinner />
    </div>
  );
};

// const getScenePathToImport = (sceneId: ISceneId) => `../../game/scenes/${sceneId}/${capitalizeFirstLetter(sceneId)}Scene`;

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

  console.log('%c [mr] sceneSlot1Ready TEST', 'background-color:Gold; color: black', sceneSlot1Ready);

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
    return React.lazy(() => import(`../../game/scenes/${sceneSlot1}/${capitalizeFirstLetter(sceneSlot1 || '')}Scene`));
  }, [sceneSlot1]);

  const SceneSlot2Component = useMemo(() => {
    // why a cannot use getScenePathToImport here?
    return React.lazy(() => import(`../../game/scenes/${sceneSlot2}/${capitalizeFirstLetter(sceneSlot2 || '')}Scene`));
  }, [sceneSlot2]);

  return (
    <div className="SceneViewer">
      {sceneSlot1 && (
        <Suspense fallback={<SceneLoading onReady={setSceneSlot1Ready} />}>
          <SceneAnimation loaded={sceneSlot1Ready} nextSceneId={sceneSlot1} id="1" key="sceneSlot1">
            <SceneSlot1Component key="sceneSlot11" loaded={sceneSlot1Ready} />
          </SceneAnimation>
        </Suspense>
      )}

      {sceneSlot2 && (
        <Suspense fallback={<SceneLoading onReady={setSceneSlot2Ready} />}>
          <SceneAnimation loaded={sceneSlot2Ready} nextSceneId={sceneSlot2} id="2" key="sceneSlot2">
            <SceneSlot2Component key="sceneSlot22" loaded={sceneSlot2Ready} />
          </SceneAnimation>
        </Suspense>
      )}
    </div>
  );
};

export default SceneViewer;
