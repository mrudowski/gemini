import {useEffect} from 'react';
import {IScriptMetaWrapper} from '../../scene/Scene/types';
import {useTypedDispatch} from '../../redux/store';
import useAutoUpdatedRef from './useAutoUpdatedRef';
import {getFirstActiveScript} from '../../scene/Scene/utils';
import {playScript} from '../../scriptPlayer/scriptPlayerSlice';

const useSimpleOnEnter = ({onEnter, ready}: {onEnter?: IScriptMetaWrapper[]; ready: boolean}) => {
  const dispatch = useTypedDispatch();
  const onEnterRef = useAutoUpdatedRef(onEnter);

  useEffect(() => {
    if (ready) {
      const activeScriptToPlay = getFirstActiveScript(onEnterRef.current);
      if (activeScriptToPlay) {
        dispatch(playScript({script: activeScriptToPlay.script}));
      }
    }
  }, [dispatch, onEnterRef, ready]);
};

export default useSimpleOnEnter;
