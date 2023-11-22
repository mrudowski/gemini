import {useEffect} from 'react';
import useAutoUpdatedRef from '../../../commons/hooks/useAutoUpdatedRef';
import {getFirstActiveScript} from '../utils';
import {ISceneId, IScriptMetaWrapper} from '../types';
import {useTypedDispatch} from '../../../redux/store';
import {playOnEnterScript, setSkipToActionOnInterrupt} from '../../../scriptPlayer/scriptPlayerSlice';
import {ICloseupId} from '../../../closeup/Closeup/types';

const useOnEnter = ({
  onEnter,
  onEnterInternalAction,
  ready,
  id,
}: {
  onEnter?: IScriptMetaWrapper[];
  onEnterInternalAction?: () => void;
  ready: boolean;
  id: ISceneId | ICloseupId;
}) => {
  const dispatch = useTypedDispatch();

  const onEnterInternalActionRef = useAutoUpdatedRef(onEnterInternalAction);
  const onEnterRef = useAutoUpdatedRef(onEnter);

  useEffect(() => {
    if (ready) {
      const activeScriptToPlay = getFirstActiveScript(onEnterRef.current);
      onEnterInternalActionRef.current && onEnterInternalActionRef.current();
      if (activeScriptToPlay && activeScriptToPlay.skipToActionOnClick) {
        dispatch(setSkipToActionOnInterrupt(activeScriptToPlay.skipToActionOnClick));
      }
      // fixing: https://github.com/mrudowski/tos3/issues/73
      // from now we add overlapped script to queue, so it will not overwrite anything anymore
      dispatch(playOnEnterScript({script: activeScriptToPlay?.script || [], sceneId: id}));
    }
  }, [dispatch, onEnterRef, onEnterInternalActionRef, id, ready]);
};

export default useOnEnter;
