import {useEffect} from 'react';
import useAutoUpdatedRef from '../../../commons/hooks/useAutoUpdatedRef';
import {getFirstActiveScript} from '../utils';
import {IScriptMetaWrapper} from '../types';
import {useTypedDispatch} from '../../../redux/store';
import {executeScriptAsOneSingleNotBlockingAction} from '../../../scriptPlayer/scriptPlayerSlice';

const useOnBeforeEnter = ({
  onBeforeEnter,
  ready,
  id,
}: {
  onBeforeEnter?: IScriptMetaWrapper[];
  ready: boolean;
  id: string;
}) => {
  const dispatch = useTypedDispatch();

  const onBeforeEnterRef = useAutoUpdatedRef(onBeforeEnter);
  useEffect(() => {
    if (ready) {
      const activeScriptToPlay = getFirstActiveScript(onBeforeEnterRef.current);
      activeScriptToPlay && dispatch(executeScriptAsOneSingleNotBlockingAction({script: activeScriptToPlay.script}));
    }
  }, [id, onBeforeEnterRef, dispatch, ready]);
};

export default useOnBeforeEnter;
