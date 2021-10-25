import React, {Suspense, useEffect, useMemo, useRef, useState} from 'react';
import {ISceneId} from '../../game/scenes';
import {useTypedSelector} from '../redux/store';
import {getCurrentSceneId} from '../redux/gemSlice';
import {getNextSceneId} from '../redux/tempSlice';
import './styles/SceneViewer.scss';

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const SuspenseTest = ({children, onReady}) => {
  useEffect(() => {
    onReady(false);
    console.log('%c [mr] SuspenseTest created', 'background-color:green; color: black');
    return () => {
      onReady(true);
      console.log('%c [mr] SuspenseTest destroyed', 'background-color:red; color: black');
    };
  }, []);
  return <div style={{color: 'white'}}>{children}</div>;
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

  // TODO move it deeper / create new component Scene for Suspense, PreloadUI, CurrentScene
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
      <Suspense fallback={<SuspenseTest onReady={setSceneSlot1Ready}>loading currentScene...</SuspenseTest>}>
        {sceneSlot1 && <SceneSlot1Component loaded={sceneSlot1Ready} key="sceneSlot1" />}
      </Suspense>
      <Suspense fallback={<SuspenseTest onReady={setSceneSlot2Ready}>loading nextScene...</SuspenseTest>}>
        {sceneSlot2 && <SceneSlot2Component loaded={sceneSlot2Ready} key="sceneSlot2" />}
      </Suspense>
    </div>
  );
};

export default SceneViewer;
