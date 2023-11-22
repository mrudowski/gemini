import {useEffect, useState} from 'react';
import {useTypedSelector} from '../../redux/store';
import {getIsGemReady} from '../../redux/tempSliceSelectors';
import useAutoUpdatedRef from './useAutoUpdatedRef';

const useSeekAttentionWhen = (whenChange, active = true) => {
  const [seekAttention, setSeekAttention] = useState<Record<string, never> | null>(null);
  const isGemReady = useTypedSelector(getIsGemReady);
  const isGemReadyRef = useAutoUpdatedRef(isGemReady);

  useEffect(() => {
    if (isGemReadyRef.current && active) {
      setSeekAttention({});
    }
  }, [whenChange, active, isGemReadyRef]);

  return seekAttention;
};

export default useSeekAttentionWhen;
