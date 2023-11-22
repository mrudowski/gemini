import React, {useCallback} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import {creditsSelectors, hideCredits, setCreditsAsReady} from '../../../actions/showCredits/showCreditsActionSlice';
import {endAction} from '../../../scriptPlayer/scriptPlayerSlice';
import CreditsWidget from '../CreditsWidget/CreditsWidget';
import GemSuspense from '../../../commons/components/GemSuspense/GemSuspense';

interface ICredits {}

const Credits: React.FC<ICredits> = () => {
  const creditsVisible = useTypedSelector(creditsSelectors.isVisible);
  const dispatch = useTypedDispatch();

  const onClose = useCallback(() => {
    dispatch(hideCredits());
  }, [dispatch]);

  const onOpenComplete = useCallback(() => {
    dispatch(setCreditsAsReady(true));
  }, [dispatch]);

  const onCloseComplete = useCallback(() => {
    dispatch(endAction());
  }, [dispatch]);

  return (
    <GemSuspense kind="main">
      <AnimatePresence onExitComplete={onCloseComplete}>
        {creditsVisible && <CreditsWidget onClick={onClose} onVisible={onOpenComplete} />}
      </AnimatePresence>
    </GemSuspense>
  );
};

export default Credits;
